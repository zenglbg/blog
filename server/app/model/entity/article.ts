import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import Base from "../base";

@Entity()
export class Article extends Base {
  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  title: string;

  @Column({
    type: "integer",
    default: 0
  })
  readedCount: number;

  @Column({
    type: "varchar",
    length: 20
  })
  author: string;

  @Column({
    type: "varchar",
    length: 100
  })
  summary: string;

  @Column({
    type: "varchar",
    length: 20
  })
  category: string;

  @Column({
    type: "varchar",
    length: 20
  })
  tag: string;

  @Column("text")
  content: string;
}
