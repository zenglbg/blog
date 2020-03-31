import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Posts extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "主题id"
  })
  post_id: number;

  @Column({
    type: "bigint",
    comment: "论坛id"
  })
  forum_id: number;

  @Column({
    type: "bigint",
    comment: "回帖用户id"
  })
  user_id: number;

  @Column({
    type: "text",
    comment: "帖子标题"
  })
  post_title: string;

  @Column({
    type: "bigint",
    comment: "帖子浏览量"
  })
  post_views: number;

  @Column({
    type: "longtext",
    comment: "帖子内容"
  })
  post_content: string;

  @Column({
    type: "varchar",
    comment: "帖子状态"
  })
  post_status: string;

  @Column({
    type: "bigint",
    comment: "回帖个数"
  })
  post_comment_count: number;
}
