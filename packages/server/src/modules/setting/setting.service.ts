import { AuthService } from '@modules/auth/auth.service';
import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './models/setting.entity';
import { from } from 'rxjs';
import { switchMap, map, withLatestFrom, concatMap } from 'rxjs/operators';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    private readonly authService: AuthService,
  ) {}

  /**
   * 更新系统设置
   * @param setting
   */
  update(setting: Partial<Setting>) {
    console.log(setting)
    const old$ = from(this.settingRepository.find());

    return old$.pipe(
      map(old =>
        old && old[0]
          ? this.settingRepository.merge(old[0], setting)
          : this.settingRepository.create(setting),
      ),
      concatMap(newSetting => this.settingRepository.save(newSetting)),
    );
  }

  /**
   *
   */
  public findAll(innerInvoke = false, token = '') {
    const isAdmin$ = this.authService.isAdmin(token);
    const data$ = from(this.settingRepository.find());
    return data$.pipe(
      withLatestFrom(isAdmin$),
      map(([settings, isAdmin]) => {
        const res = settings[0];
        if (!res) {
          return {} as Setting;
        }

        if (innerInvoke || isAdmin) {
          return res;
        }

        const filterRes = [
          'systemUrl',
          'systemTitle',
          'systemLogo',
          'systemFavicon',
          'systemFooterInfo',
          'seoKeyword',
          'seoDesc',
          'github',
          'paypal',
          'wechat',
          'instagram',
          'youtube',
          'alipay',
          'soundcloud',
          'telegram',
        ].reduce((a, c) => {
          a[c] = res[c];
          return a;
        }, {}) as Setting;
        return filterRes;
      }),
    );
    // data$.
  }
}
