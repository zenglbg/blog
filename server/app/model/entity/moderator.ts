import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Moderator extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "版主id"
  })
  moderator_id: number;

  @Column({
    type: "bigint",
    comment: "论坛id"
  })
  forum_id: number;

  @Column({
    type: "varchar",
    length: 20,
    comment: "版主级别"
  })
  moderator_level: string;
}
