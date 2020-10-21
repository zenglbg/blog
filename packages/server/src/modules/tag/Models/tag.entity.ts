import { Entity, Column, ManyToMany } from 'typeorm';
import { Base } from '@common/entity/base.entity';
import { Article } from '@modules/article/models/article_info.entity';

@Entity({
  name: 'tag',
})
export class Tag extends Base {
  @Column()
  label: string;

  @Column()
  value: string;

  @ManyToMany(
    () => Article,
    article => article.tags
  )
  articles: Array<Article>;
}
