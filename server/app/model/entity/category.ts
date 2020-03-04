import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import Base from "../base";

@Entity()
export class Category extends Base {
  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number;

  @Column({
    type: "varchar",
    length: 20,
    unique: true
  })
  name: string;
}
