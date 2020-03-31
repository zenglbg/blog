import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Labels extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "分类id"
  })
  label_id: number;

  @Column({
    type: "varchar",
    length: 50,
    comment: "分类名称"
  })
  label_name: string;

  @Column({
    type: "varchar",
    length: 15,
    comment: "分类别名"
  })
  label_alias: string;

  @Column({
    type: "text",
    comment: "分类描述"
  })
  label_description: string;
}
