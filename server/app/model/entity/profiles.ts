import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
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

@Entity()
export class Profiles extends Base {
  @PrimaryGeneratedColumn({
    type: "int",
    comment: "用户id",
  })
  profile_id: number;

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
    default: "1",
  })
  user_level: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户权限",
    default: "1",
  })
  user_rights: string;

  @Column({
    type: "date",
    comment: "用户生日",
    nullable: true,
  })
  user_birthday: Date;

  @Column({
    type: "tinyint",
    comment: "用户年龄",
    nullable: true,
  })
  user_age: string;

  @IsPhoneNumber("CN", {
    message: "手机号码格式错误",
  })
  @Column({
    type: "varchar",
    length: 11,
    comment: "用户手机号",
    nullable: true,
  })
  user_telephone_number: string;

  @Column({
    type: "varchar",
    length: 20,
    comment: "用户昵称",
    default: "一星斗者",
  })
  user_nickname: string;
}
