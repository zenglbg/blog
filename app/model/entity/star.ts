import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import Base from "../base";

@Entity()
export class Star extends Base {
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

  @Column("varchar")
  url: string;
}
