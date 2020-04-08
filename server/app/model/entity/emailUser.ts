import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import Base from "../base";

@Entity()
export class EmailUser extends Base {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @IsNotEmpty()
  @Column()
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({
    type: "varchar",
    length: 30,
    comment: "用户邮箱",
  })
  user_email: string;

  @IsNotEmpty()
  @Column({
    type: "varchar",
    length: 6,
    comment: "验证码",
  })
  validate_code: string;

  @Column({
    type: "bigint",
    comment: "过期时间",
  })
  dead_line: number;

  @Column({
    type: "tinyint",
    comment: "是否有效，1-无效，2-有效",
  })
  usable: number;

  @Column({
    type: "tinyint",
    comment: "是否已发送，1-未发送，2-已发送",
  })
  sended: number;
}
