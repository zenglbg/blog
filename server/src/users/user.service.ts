import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'request';
import { User } from './users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,
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

  getSession(body) {
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 7 ~ UserController ~ findAll ~ body',
      body,
    );
    const appid = 'wxc96bf44363295aad';
    const appSecret = 'a343236789dd4927130607266a1c1fd6';
    const { code } = body;
    console.log(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
    );
    return new Promise((resolve, reject) => {
      request(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`,
        function (error, response, body) {
          if (!error) {
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            resolve(body);
          } else {
            console.error('error:', error); // Print the error if one occurred
            reject(error);
          }
        },
      );
    });
  }

  doLogin({ username, password }) {
    const user = this.userModel.findOne({ username });
    return user;
  }
}
