import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '@modules/Category/Models/category.entity';
import { Tag } from '@modules/tag/Models/tag.entity';
import { Base } from '@entity/base.entity';
import { ArticleContent } from './article_context.entity';

@Entity({
  name: 'article',
})
export class Article extends Base {
  @Column()
  title: string;

  @Column({ default: null, comment: '封面图' })
  cover: string;

  @Column({ type: 'text', default: null, comment: '摘要，自动生成' })
  summary: string;

  @OneToOne(
    type => ArticleContent,
    articleContent => articleContent.info,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  content: ArticleContent;

  @ManyToOne(
    type => Category,
    category => category.articles,
    {
      cascade: true,
    },
  )
  @JoinTable()
  category: Category;

  @ManyToMany(
    type => Tag,
    tag => tag.articles,
    {
      cascade: true,
    },
  )
  @JoinTable()
  tags: Array<Tag>;

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
