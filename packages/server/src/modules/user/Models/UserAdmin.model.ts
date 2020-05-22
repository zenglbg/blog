/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: atzcl <atzcl0310@gmail.com>  https://github.com/atzcl
+-----------------------------------------------------------------------------------------------------------------------
| 后台管理人员 user 用户表
|
*/

import { DataType, Table, Column } from 'sequelize-typescript';
import Helper from '../../../foundations/Utils/helper';
import { BaseModel, DefaultColumns } from '../../../foundations/ORM/Model';
const { STRING } = DataType;

@Table({
  modelName: 'user_admins',
})
export class UserAdminModel extends BaseModel<UserAdminModel> {
  /**
   * @param {string[]} 输出数据时，隐藏字段数组 [ 黑名单 ]
   */
  static hidden = ['password'];

  @Column({ type: STRING(100) })
  get password(): string {
    return this.getDataValue('password');
  }

  set password(value: string) {
    this.setDataValue('password', Helper.createBcrypt(value));
  }

  @Column({ type: STRING(100), unique: true, allowNull: true })
  username!: string;

  @Column({ type: STRING(50), unique: true, allowNull: true })
  email!: string;

  @Column({ type: STRING(20), unique: true, allowNull: true })
  phone!: string;

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

  /**
   * 用 id 查询指定用户信息
   *
   * @param id
   */
  static async getUserById(id: string) {
    return this.findOne({
      where: { id },
      attributes: ['id', 'avatar', 'sex', 'phone', 'name', 'username'],
    });
  }
}
