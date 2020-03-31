import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

import Base from "../base";

@Entity()
export class Option extends Base {
  @PrimaryGeneratedColumn({
    type: "int",
    comment: "选项id"
  })
  option_id: number;

  @Column({
    type: "varchar",
    length: 255,
    comment: "选项名称"
  })
  option_name: string;

  @Column({
    type: "longtext",
    comment: "选项值"
  })
  option_values: string;
}
