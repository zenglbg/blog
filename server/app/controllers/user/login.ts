import { User } from "../../model/entity";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import {
  Ctx,
  Param,
  Get,
  Post,
  JsonController,
  Body,
  Session,
} from "routing-controllers";
import { Service, Inject } from "typedi";

import { Mysql, Utils } from "../../service";

@Service()
@JsonController("/api")
export default class {
  @Inject()
  mysql: Mysql;
  @Inject()
  utils: Utils;
  private saltRounds = 10;
  private jwtKey = process.env.JWTKEY || "complexKey";

  @Post("/login1")
  public async login(
    @Body() { user_name, user_password }: any,
    @Session() session: any
  ) {
    // const hash_password = await this.utils.crypto(
    //   this.saltRounds,
    //   user_password
    // );
    const login = await this.mysql.findOne(User, { user_name });
    if (!login) {
      return {
        code: 202,
        msg: "用户尚未注册",
      };
    } else {
      const isSame = await this.utils.isSame(
        user_password,
        login.user_password
      );
      if (isSame) {
        /**
         * login 存在，命中用户名和密码
         * 更新token
         */
        const token = this.utils.token(this.jwtKey, user_name);
        session.token = token;
        session.user_name = user_name;
        return {
          code: 200,
          msg: "登录成功",
          token,
        };
      }
      return {
        code: 202,
        msg: "账户或密码错误",
      };
    }
  }

  @Post("/register")
  public async register(@Body({ validate: true }) user: User) {
    /**
     * 1. 检查用户名是否存在
     */
    const {
      user_name,
      user_password,
      user_ip,
      user_birthday,
      user_age,
      user_avatar,
      user_email,
      user_nickname,
      user_level,
      user_rights,
      user_telephone_number,
    } = user;
    const is_exist = await this.mysql.findOne(User, { user_name });
    if (is_exist) {
      return {
        code: 206,
        msg: "用户已存在",
      };
    } else {
      /**
       * 添加用户。
       * 加密密码
       * 验证是否添加成功
       */
      const hash_password = await this.utils.crypto(
        this.saltRounds,
        user_password
      );
      const create = await this.mysql.save(User, {
        ...user,
        user_password: hash_password,
      });
      if (create) {
        return {
          code: 200,
          msg: "用户创建成功",
        };
      }
      return {
        code: 202,
        msg: "用户创建失败",
      };
    }
  }

  @Post("/logout")
  public async logout(@Session() session: any) {
    delete session.token;
    delete session.user_name;
    return {
      code: 200,
      msg: "退出成功",
    };
  }
}
