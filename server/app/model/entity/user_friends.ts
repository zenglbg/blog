import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class User_friends extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "标识id"
  })
  id: number;

  @Column({
    type: "bigint",
    comment: "用户id"
  })
  user_id: number;

  @Column({
    type: "bigint",
    comment: "好友id"
  })
  user_friends_id: number;

  @Column({
    type: "varchar",
    length: "20",
    comment: "好友备注"
  })
  user_note: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "好友状态"
  })
  user_status: string;
}
