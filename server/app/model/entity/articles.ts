import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Articles extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "博文id"
  })
  article_id: number;

  @Column({
    type: "bigint",
    comment: "用户id"
  })
  user_id: number;

  @Column({
    type: "text",
    comment: "文章标题"
  })
  article_title: string;
  @Column({
    type: "longtext",
    comment: "文章内容"
  })
  article_content: string;

  @Column({
    type: "bigint",
    comment: "浏览量"
  })
  artilce_views: number;

  @Column({
    type: "bigint",
    comment: "评论数"
  })
  article_comment_count: number;

  @Column({
    type: "bigint",
    comment: "点赞数"
  })
  article_like_count: number;
}
