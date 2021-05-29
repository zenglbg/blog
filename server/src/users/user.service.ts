import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { typeUser, User } from './users.schema';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
    const user = await this.getByInfo({ username: 'admin' });

    if (!user) {
      const username = 'admin';
      const password = 123;
      console.log(`创建初始化数据，账号为${username}' 密码为： ${password}`);
      this.setUser({
        username,
        password,
        name: '系统管理员',
        role: 1,
      });
    }
  }

  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<typeUser>,
  ) {}

  getAll() {
    return this.userModel.find();
  }

  getOne(_id) {
    return this.userModel.findById(_id);
  }

  setUser(body) {
    console.log(
      '🚀 ~ file: user.service.ts ~ line 47 ~ UserService ~ setUser ~ body',
      body,
    );
    return this.userModel.create(body);
  }

  updateOne(_id, body) {
    return this.userModel.findByIdAndUpdate(_id, body);
  }

  deleteOne(_id) {
    return this.userModel.findByIdAndDelete(_id);
  }

  async getByInfo(info): Promise<typeUser> {
    return this.userModel.findOne(info);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.getByInfo({ username });
    if (user.isValidPassword(password)) {
      return user.toJSON();
    }
    return {
      data: null,
      msg: `验证错误`,
    };
  }
}
