import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import Base from "../base";

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "用户id"
  })
  user_id: number;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户ip"
  })
  user_ip: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户名"
  })
  user_name: string;

  @Column({
    type: "varchar",
    length: 15,
    comment: "用户密码"
  })
  user_password: string;

  @Column({
    type: "varchar",
    length: 30,
    comment: "用户邮箱"
  })
  user_email: string;

  @Column({
    type: "varchar",
    length: 255,
    comment: "用户头像"
  })
  user_avatar: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户等级"
  })
  user_level: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户权限"
  })
  user_rights: string;

  @Column({
    type: "date",
    comment: "用户生日"
  })
  user_birthday: Date;

  @Column({
    type: "tinyint",
    comment: "用户年龄"
  })
  user_age: string;

  @Column({
    type: "int",
    comment: "用户手机号"
  })
  user_telephone_number: number;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户昵称"
  })
  user_nickname: string;
}
