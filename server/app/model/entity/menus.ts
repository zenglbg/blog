import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Menus extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "总菜单id"
  })
  menu_id: number;

  @Column({
    type: "varchar",
    length: 20,
    comment: "总菜单名称"
  })
  menu_name: string;
}
