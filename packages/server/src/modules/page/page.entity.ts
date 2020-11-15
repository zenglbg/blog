import { Base } from '@common/entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'page',
})
export class Page extends Base {
  @Column({ default: null, comment: '页面封面' })
  cover: string;

  @Column({ comment: '页面名' })
  name: string;

  @Column({ comment: '页面路径' })
  path: string;

  @Column({
    type: 'mediumtext',
    default: null,
    charset: 'utf8mb4',
    comment: '原始内容',
  })
  content: string;

  @Column({
    type: 'mediumtext',
    default: null,
    charset: 'utf8mb4',
    comment: '格式化内容，自动生成',
  })
  html: string;

  @Column({
    type: 'mediumtext',
    default: null,
    comment: '格式化内容索引，自动生成',
  })
  toc: string;

  @Column('simple-enum', { enum: ['draft', 'publish'], comment: '页面状态' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date; // 发布日期

 
  @Column({ type: 'int', default: 0, comment: '阅读量' })
  views: number;
}
