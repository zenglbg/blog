import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '../../../common/exceptions/api.exception';
import { ApiErrorCode } from '../../../common/enums/api-error-code.enum';
import { from, throwError, Observable, of, concat, combineLatest } from 'rxjs';
import {
  switchMap,
  mergeMap,
  merge,
  map,
  concatAll,
  catchError,
  concatMap,
} from 'rxjs/operators';

import { User } from '../models/user.entity';
import { UpdatePasswordUserDto } from '../dtos/index.user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.init();
  }

  public init() {
    const { name, password } = this.configService.get('base').admin;

    this.createUser({
      name,
      password,
      role: 'admin',
    }).subscribe(
      function next(_) {
        console.log();
        console.log(
          `管理员账户创建成功，用户名：${name}，密码：${password}，请及时登录系统修改默认密码`,
        );
        console.log();
      },
      function error(_) {
        console.log();
        console.log(
          `管理员账户已经存在，用户名：${name}，密码：${password}，请及时登录系统修改默认密码`,
        );

        console.log();
      },
    );
  }

  public findAll(queryParams: any = {}): Observable<[User[], number]> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.createAt', 'DESC');

    const { page = 1, pageSize = 12, status, ...otherParams } = queryParams;

    query.skip((+page - 1) * +pageSize);
    query.take(+pageSize);

    if (status) {
      query.andWhere('user.status=:status').setParameter('status', status);
    }

    if (otherParams) {
      Object.keys(otherParams).forEach(key => {
        query
          .andWhere(`user.${key} LIKE :${key}`)
          .setParameter(`${key}`, `%${otherParams[key]}%`);
      });
    }
    return from(query.getManyAndCount());
  }

  /**
   * 创建用户
   * @param user
   */
  public createUser(user: Partial<User>) {
    const { name } = user;
    return from(this.userRepository.findOne({ where: { name } })).pipe(
      concatMap(existUser => {
        if (existUser) {
          throw new ApiException(
            '用户已存在',
            ApiErrorCode.USER_NAME_INVALID,
            HttpStatus.OK,
          );
        }
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
      }),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  /**
   * 登录
   * @param user
   * 此无法没有catchError, 必须再下游捕获错误。
   */
  public login(user: Partial<User>) {
    const { name, password } = user;
    return from(this.userRepository.findOne({ where: { name } })).pipe(
      concatMap(existUser => {
        if (!existUser) {
          throw new HttpException(`用户不存在`, HttpStatus.BAD_REQUEST);
        } else {
          return combineLatest([
            from(User.comparePassword(password, existUser.password)),
            of(existUser),
          ]);
        }
      }),
      map(([isSame, existUser]) => {
        if (!isSame) {
          throw new HttpException(`密码错误`, HttpStatus.BAD_REQUEST);
        }
        if (existUser.status == 'locked') {
          throw new HttpException(
            `用户已锁定，无法登录`,
            HttpStatus.BAD_REQUEST,
          );
        }
        return existUser;
      }),
    );
  }

  /**
   * findByid
   */
  public findByid(id) {
    return from(this.userRepository.findOne(id));
  }

  /**
   * updateById
   * 更新指定用户
   */
  public updateById(user: Partial<User>) {
    const { id } = user;
    return from(this.userRepository.findOne(id)).pipe(
      switchMap(oldUser => {
        delete user.password;

        const newUser = this.userRepository.merge(oldUser, user);

        return from(this.userRepository.save(newUser));
      }),
    );
  }

  /**
   * updatePassword
   * 升级密码
   */
  public updatePassword(user: UpdatePasswordUserDto) {
    const { id, oldPassword, newPassword } = user;
    return from(this.userRepository.findOne(id)).pipe(
      switchMap(existUser => {
        if (!existUser) {
          throw new HttpException(
            '用户不存在',
            // tslint:disable-next-line: trailing-comma
            HttpStatus.BAD_REQUEST,
          );
        }
        return combineLatest(
          from(User.comparePassword(oldPassword, existUser.password)),
          of(existUser),
        );
      }),
      switchMap(([isSame, existUser]) => {
        if (!isSame) {
          throw new HttpException(
            '旧密码不正确',
            // tslint:disable-next-line: trailing-comma
            HttpStatus.BAD_REQUEST,
          );
        }

        let hashNewPassword = User.encryptPassword(newPassword);

        const newUser = this.userRepository.merge(existUser, {
          password: hashNewPassword,
        });
        return from(this.userRepository.save(newUser));
      }),
      catchError(err => of(err)),
    );
  }
}
