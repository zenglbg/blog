import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Sorts extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "分类id"
  })
  sort_id: number;

  @Column({
    type: "varchar",
    length: 50,
    comment: "分类名称"
  })
  sort_name: string;

  @Column({
    type: "varchar",
    length: 15,
    comment: "分类别名"
  })
  sort_alias: string;

  @Column({
    type: "text",
    comment: "分类描述"
  })
  sort_description: string;

  @Column({
    type: "bigint",
    comment: "分类父id"
  })
  parent_sort_id: number;
}
