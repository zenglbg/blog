import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import Base from "../base";

@Entity()
export class Articles extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "博文id",
  })
  article_id: number;

  @IsNotEmpty()
  @Column({
    type: "varchar",
    length: 20,
    comment: "用户id",
  })
  user_name: string;

  @IsNotEmpty()
  @Column({
    type: "text",
    comment: "文章标题",
  })
  article_title: string;

  @IsNotEmpty()
  @Column({
    type: "longtext",
    comment: "文章内容",
  })
  article_content: string;

  @Column({
    type: "bigint",
    comment: "浏览量",
    default: 0,
  })
  artilce_views: number;

  @Column({
    type: "bigint",
    comment: "评论数",
    default: 0,
  })
  article_comment_count: number;

  @Column({
    type: "bigint",
    comment: "点赞数",
    default: 0,
  })
  article_like_count: number;
}
