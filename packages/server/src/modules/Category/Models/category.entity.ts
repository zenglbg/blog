import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Article } from '@modules/article/models/article_info.entity';
import { Base } from '@common/entity/base.entity';

@Entity({ name: 'category' })
export class Category extends Base {
  @Column()
  label: string;

  @Column()
  value: string;

  @OneToMany(
    () => Article,
    article => article.category,
    {
      nullable: true,
      cascade: ['insert', 'update', 'remove'],
    },
  )
  articles: Array<Article>;
}
