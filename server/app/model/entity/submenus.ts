import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import Base from "../base";

@Entity()
export class Submenus extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "子菜单id"
  })
  link_id: number;

  @Column({
    type: "bigint",
    comment: "总菜单id"
  })
  menu_name: string;

  @Column({ type: "varchar", length: 20, comment: "子菜单名字" })
  link_name: string;

  @Column({ type: "varchar", length: 255, comment: "子菜单链接" })
  link_target: string;

  @Column({ type: "varchar", length: 20, comment: "子菜单打开方式" })
  link_open_way: string;

  @Column({
    type: "bigint",
    comment: "父菜单id"
  })
  parent_link_id: number;
}
