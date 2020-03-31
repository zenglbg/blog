import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Floors extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "回帖id"
  })
  floor_id: number;

  @Column({
    type: "bigint",
    comment: "回帖用户id"
  })
  user_id: number;

  @Column({
    type: "bigint",
    comment: "所属主贴id"
  })
  post_id: number;

  @Column({
    type: "longtext",
    comment: "回帖内容"
  })
  floor_content: string;

  @Column({
    type: "bigint",
    comment: "父回帖id"
  })
  post_floor_id: number;
}
