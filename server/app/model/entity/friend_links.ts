import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Friend_links extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "友链id"
  })
  friend_link_id: number;

  @Column({ type: "varchar", length: 255, comment: "友链链接" })
  friend_links: string;

  @Column({ type: "varchar", length: 20, comment: "友链名字" })
  friend_link_name: string;

  @Column({ type: "text", comment: "友链描述" })
  friend_link_description: string;

  @Column({ type: "varchar", length: 255, comment: "友链logo" })
  friend_link_logo: string;
}
