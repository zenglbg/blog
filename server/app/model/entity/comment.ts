import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Comment extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "评论id"
  })
  comment_id: number;

  @Column({
    type: "bigint",
    comment: "用户id"
  })
  user_id: number;

  @Column({
    type: "bigint",
    comment: "评论文章id"
  })
  article_id: number;

  @Column({
    type: "bigint",
    comment: "点赞数"
  })
  comment_like_count: number;

  @Column({
    type: "text",
    comment: "浏览量"
  })
  comment_content: string;

  @Column({
    type: "bigint",
    comment: "父评论id"
  })
  parent_comment_id: string;
}
