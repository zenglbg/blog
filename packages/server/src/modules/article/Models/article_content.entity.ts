import { Entity, Column, OneToOne } from 'typeorm';
import { Base } from '@common/entity/base.entity';
import { Article } from './article_info.entity';

@Entity({
  name: 'article_content',
})
export class ArticleContent extends Base {
  @Column({ type: 'mediumtext', default: null, comment: '原始内容' })
  content: string;

  
  // @OneToOne(
  //   type => Article,
  //   article => article.content,
  // )
  // info: Article;
}
