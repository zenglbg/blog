import { Base } from '@common/entity/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({
  name: 'comment',
})
export class Comment extends Base {
  @Column({ default: null, comment: '联系人名字' })
  name: string;

  @Column({ default: null, comment: '联系方式' })
  email: string;

  @Column({ default: null, comment: '评论内容' })
  content: string;

  @Column({ default: null, comment: '是否审核通过' })
  pass: boolean;

  @Column({
    type: 'mediumtext',
    default: null,
    charset: 'utf8mb4',
    comment: '浏览器头',
  })
  userAgent: string;

  @Column({ default: null, comment: '关联文章或页面id' })
  hostId: string;

  @Column({ type: 'boolean', default: false, comment: '是否评论动态页面' })
  isHostInPage: boolean;

  @Column({ default: null, comment: '父级评论id' })
  parentCommentId: string;

  @Column({ default: null, comment: '回复评论用户名' })
  replyUserName: string;

  @Column({ default: null, comment: '回复评论邮箱' })
  replyUserEmail: string;
}
