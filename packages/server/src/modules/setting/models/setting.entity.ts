import { Base } from '@common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'setting',
})
export class Setting extends Base {
  @Column({ type: 'text', default: null })
  systemUrl: string;

  @Column({ type: 'text', default: null })
  systemTitle: string;

  @Column({ type: 'text', default: null })
  systemLogo: string;

  @Column({ type: 'text', default: null })
  systemFavico: string;

  @Column({ type: 'text', default: null })
  systemFooterInfo: string;

  @Column({ type: 'text', default: null })
  github: string;

  @Column({ type: 'text', default: null })
  paypal: string;

  @Column({ type: 'mediumtext', default: null })
  wechat: string;

  @Column({ type: 'mediumtext', default: null })
  alipay: string;

  @Column({ type: 'text', default: null })
  instagram: string;

  @Column({ type: 'text', default: null })
  youtube: string;

  @Column({ type: 'text', default: null })
  soundcloud: string;

  @Column({ type: 'text', default: null })
  telegram: string;

  @Column({ type: 'text', default: null })
  seoKeyword: string;

  @Column({ type: 'text', default: null })
  seoDesc: string;

  @Column({ type: 'text', default: null, comment: '阿里云 region' })
  ossRegion: string;

  @Column({ type: 'text', default: null, comment: '阿里云 accessKeyId' })
  ossAccessKeyId: string;

  @Column({ type: 'text', default: null, comment: '阿里云  accessKeySecret' })
  ossAccessKeySecret: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '阿里云 oss 是否开启 https',
  })
  ossHttps: boolean;

  @Column({ type: 'text', default: null, comment: '阿里云 bucket' })
  ossBucket: string;

  @Column({ type: 'text', default: null })
  smtpHost: string;

  @Column({ type: 'text', default: null })
  smtpPort: string;

  @Column({ type: 'text', default: null })
  smtpUser: string;

  @Column({ type: 'text', default: null })
  smtpPass: string;

  @Column({ type: 'text', default: null })
  smtpAdress: string;
}
