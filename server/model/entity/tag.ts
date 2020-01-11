import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

import Base from "../base";

@Entity()
export class Admin extends Base {
  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  name: string;

  @Column({
    type: "varchar",
    length: 6
  })
  password: string;
}
