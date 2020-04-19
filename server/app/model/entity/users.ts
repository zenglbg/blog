import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { IsNotEmpty, Length, IsIP } from "class-validator";
import Base from "../base";
import { Profiles } from "./profiles";

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn({
    type: "int",
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

  @OneToOne((type) => Profiles, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn({ name: "profile" })
  profile: Profiles;
}
