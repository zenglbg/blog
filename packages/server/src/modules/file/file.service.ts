import { SettingService } from '@modules/setting/setting.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as OSS from 'ali-oss';
import { concat, from } from 'rxjs';
import * as dayjs from 'dayjs';
import { concatMap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { File } from './models/file.entity';
@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly settingService: SettingService,
  ) {}

  uploadFile(file: any) {
    const { originalname, mimetype, size, buffer } = file;
    const filename = `/${dayjs().format('YYYY-MM-DD')}/${originalname}`;
    return from(this.fileRepository.findOne({ where: { filename } })).pipe(
      concatMap(file => {
        console.log(file)
        if (file) {
          throw new HttpException('文件已存在！', HttpStatus.BAD_REQUEST);
        } else {
          return this.settingService.findAll(true);
        }
      }),
      concatMap(
        ({
          ossRegion,
          ossAccessKeyId,
          ossBucket,
          ossAccessKeySecret,
          ossHttps,
        }) => {
          if (
            !ossRegion ||
            !ossAccessKeyId ||
            !ossBucket ||
            !ossAccessKeySecret
          ) {
            throw new HttpException('请完善 OSS 配置', HttpStatus.BAD_REQUEST);
          }
          const client = new OSS({
            region: ossRegion,
            accessKeyId: ossAccessKeyId,
            accessKeySecret: ossAccessKeySecret,
            bucket: ossBucket,
            secure: ossHttps,
          });

          return client.put(filename, buffer).then(({ url }) => {
            return this.fileRepository.create({
              originalname,
              filename,
              url,
              type: mimetype,
              size,
            });
          });
        },
      ),
      concatMap(setting => this.fileRepository.save(setting)),
    );
  }

  getFiles() {
    return this.fileRepository.find();
  }
}
