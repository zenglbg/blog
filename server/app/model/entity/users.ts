import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Length,
  IsIP,
  IsDate,
  IsPhoneNumber,
} from "class-validator";
import Base from "../base";
import { isIP } from "net";
import { isDate } from "util";

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn({
    type: "bigint",
    comment: "用户id",
  })
  user_id: number;

  @IsIP(4, {
    message: "ip格式错误",
  })
  @Column({
    type: "varchar",
    length: 20,
    comment: "用户ip",
  })
  user_ip: string;

  @IsNotEmpty({
    message: "用户名不能为空",
  })
  @Column({
    type: "varchar",
    length: 20,
    comment: "用户名",
  })
  user_name: string;

  @IsNotEmpty({
    message: "密码不能为空",
  })
  @Length(6, 60, {
    message: "密码长度错误",
  })
  @Column({
    type: "varchar",
    length: 60,
    comment: "用户密码",
  })
  user_password: string;

  @IsEmail()
  @Column({
    type: "varchar",
    length: 30,
    comment: "用户邮箱",
  })
  user_email: string;

  @Column({
    type: "varchar",
    length: 255,
    comment: "用户头像",
  })
  user_avatar: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户等级",
  })
  user_level: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户权限",
  })
  user_rights: string;

  @Column({
    type: "date",
    comment: "用户生日",
  })
  user_birthday: Date;

  @Column({
    type: "tinyint",
    comment: "用户年龄",
  })
  user_age: string;

  @IsPhoneNumber("CN", {
    message: "手机号码格式错误",
  })
  @Column({
    type: "varchar",
    length: 11,
    comment: "用户手机号",
  })
  user_telephone_number: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户昵称",
  })
  user_nickname: string;
}
