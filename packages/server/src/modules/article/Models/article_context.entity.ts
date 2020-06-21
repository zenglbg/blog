import { Entity, Column, OneToOne } from 'typeorm';
import { Base } from '@common/entity/base.entity';
import { Article } from './article_info.entity';

@Entity({
  name: 'article_context',
})
export class ArticleContext extends Base {
  @Column({ type: 'mediumtext', default: null, comment: '原始内容' })
  context: string;

  @OneToOne(
    type => Article,
    article => article.context,
  )
  info: Article;
}
