import { Entity, Column, ManyToMany } from 'typeorm';
import { Base } from '@common/entity/base.entity';
import { Article } from '@modules/article/Models/article.entity';

@Entity({
  name: 'tags',
})
export class Tags extends Base {
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
