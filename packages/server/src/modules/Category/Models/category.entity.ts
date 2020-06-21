import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '@modules/article/Models/article_info.entity';
import { Base } from '@common/entity/base.entity';

@Entity({ name: 'category' })
export class Category extends Base {


  @Column()
  label: string;

  @Column()
  value: string;


  @OneToMany(
    () => Article,
    article => article.category
  )
  articles: Array<Article>
}
