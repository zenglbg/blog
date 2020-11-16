import { Base } from '@common/entity/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Search extends Base {
  @Column({ comment: '搜索类型' })
  type: string;

  @Column({ comment: '搜索关键词' })
  keyword: string;

  @Column({ default: 1 })
  count: number;
  
}
