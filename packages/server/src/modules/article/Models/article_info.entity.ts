import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '@modules/category/models/category.entity';
import { ArticleContent } from './article_content.entity';
import { Tag } from '@modules/tag/models/tag.entity';
import { Base } from '@entity/base.entity';

@Entity({
  name: 'article',
})
export class Article extends Base {
  @Column()
  title: string;

  @Column({ type: 'text', default: null, comment: '封面图' })
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
  // @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content: ArticleContent;

  @ManyToOne(
    type => Category,
    category => category.articles,
    {
      onDelete: "CASCADE"
    }
  )
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
