/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 客户端 user 用户表
|
*/

import { DataType, Table, Column, Length } from 'sequelize-typescript';
import Helper from '../../../foundations/Utils/helper';
import { BaseModel } from '../../../foundations/ORM/Model';

const { STRING } = DataType;

@Table({
  modelName: 'users',
})
export class UserModel extends BaseModel<UserModel> {
  @Column({ type: STRING(100), primaryKey: true, unique: true })
  id!: string;

  @Column({ type: STRING(100), unique: true, allowNull: true })
  username!: string;

  @Column({ type: STRING(100), unique: true, allowNull: true })
  email!: string;

  @Column({ type: STRING(100), unique: true, allowNull: true })
  phone!: string;

  @Column
  get password(): string {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', Helper.createBcrypt(value));
  }

  @Column({ allowNull: true })
  name!: string;

  @Column({ allowNull: true })
  nickname!: string;

  @Column({ allowNull: true })
  avatar!: string;

  @Column({ allowNull: true })
  bio!: string;

  @Column({ defaultValue: 0 })
  sex!: number;

  @Column({ allowNull: true })
  location!: string;

  @Column({ allowNull: true })
  birthdate!: string;

  @Column({ allowNull: true })
  emailVerifiedAt!: string;

  @Column({ allowNull: true })
  phoneVerifiedAt!: string;

  @Column({ allowNull: true })
  userLevelId!: number;

  @Column({ allowNull: true })
  status!: number;

  @Column({ allowNull: true })
  onlineStatus!: number;

  @Column({ allowNull: true })
  userToken!: string;
}
