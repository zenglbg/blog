import { Entity, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Category } from '@modules/Category/Models/category.entity';
import { Tags } from '@modules/tags/Models/tags.entity';
import { Base } from '@entity/base.entity';
import { Name } from '@entity/name.entity'


@Entity({
  name: 'articles',
})
export class Article extends Base {
 
  @Column()
  title: string;

  @Column({ default: null, comment: '封面图' })
  cover: string;

  @Column({ type: 'text', default: null, comment: '摘要，自动生成' })
  summary: string;

  @Column({ type: 'mediumtext', default: null, comment: '原始内容' })
  context: string;

  @ManyToOne(() => Category, category => category.articles, {
    cascade: true
  })
  @JoinTable()
  category: Category;

  @ManyToMany(() => Tags, tag=>tag.articles, {
    cascade: true
  })
  @JoinTable()
  tags: Array<Tags>;

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'text', default: null, select: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  needPassword: boolean;

  @Column({ type: 'boolean', default: true })
  isCommentable: boolean;

  @Column({
    type: 'timestamp',
    comment: '发布日期',
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishAt: Date;
}
