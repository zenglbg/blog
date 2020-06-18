import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  // @todo 完成路径别名
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'datetime',
    comment: '修改时间',
    name: 'update_at',
  })
  updateAt: Date;
}
