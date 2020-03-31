import { Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Set_label extends Base {
  @PrimaryColumn({
    type: "bigint",
    comment: "文章id"
  })
  article_id: number;

  @PrimaryColumn({
    type: "bigint",
    comment: "分类id"
  })
  label_id: number;
}
