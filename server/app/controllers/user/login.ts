import { User, EmailUser } from "../../model/entity";
import { Request } from "express";

import {
  Ctx,
  Param,
  Get,
  Post,
  JsonController,
  Body,
  BodyParam,
  Session,
  Authorized,
  Req,
} from "routing-controllers";
import { Service, Inject } from "typedi";

import { Mysql, Utils, Auth } from "../../service";

@Service()
@JsonController("/api")
export default class {
  @Inject()
  mysql: Mysql;
  @Inject()
  utils: Utils;
  @Inject()
  auth: Auth;
  private saltRounds = 10;
  private jwtKey = process.env.JWTKEY || "complexKey";

  @Post("/login1")
  public async login(
    @Body() { user_name, user_password }: any,
    @Session() session: any
  ) {
    const login = await this.mysql.findOne(User, { user_name });
    if (!login) {
      return {
        code: 202,
        msg: "用户尚未注册",
      };
    } else {
      const isSame = await this.auth.isSame(user_password, login.user_password);
      if (isSame) {
        /**
         * login 存在，命中用户名和密码
         * 更新token
         */
        const token = this.auth.token(this.jwtKey, user_name);
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

  @Post("/code")
  public async code(
    @BodyParam("user_name") user_name: string,
    @BodyParam("user_email") user_email: string
  ) {
    const is_exist = await this.mysql.findOne(User, { user_name });
    if (is_exist) {
      return {
        code: 206,
        msg: "用户已存在",
      };
    }
    /**
     * 验证通过。发送邮件验证码
     */
    const validate_code = this.utils.code(6);
    const dead_line = this.utils.deadTime(1000 * 60 * 30);
    const is_save = await this.mysql.save(EmailUser, {
      user_name,
      user_email,
      validate_code,
      dead_line,
      usable: 2,
      sended: 1,
    });

    this.utils.sendCode(user_email, validate_code, async () =>
      this.mysql.update(
        EmailUser,
        { validate_code },
        {
          sended: 2,
        }
      )
    );

    return {
      code: 200,
      msg: "帐号未被使用！",
    };
  }

  @Post("/register")
  public async register(
    @Req() req: Request,
    @Body({ validate: true }) user: User & { validate_code: string }
  ) {
    /**
     * 1. 检查用户名是否存在
     */
    const { user_name, user_password, validate_code } = user;
    const user_ip = this.utils.getIp(req);
    const user_avatar = "images/men.png";

    /**
     * 添加用户。
     * 加密密码
     * 验证是否添加成功
     */
    const email: EmailUser = await this.mysql.findOne(EmailUser, {
      user_name,
      validate_code,
    });
    if (email && email.dead_line > new Date().getTime()) {
      const hash_password = await this.auth.crypto(
        this.saltRounds,
        user_password
      );
      const create = await this.mysql.save(User, {
        ...user,
        user_ip,
        user_avatar,
        user_password: hash_password,
      });
      if (create) {
        await this.mysql.update(EmailUser, { validate_code }, { usable: 1 });

        return {
          code: 200,
          msg: "用户创建成功",
        };
      }
      return {
        code: 202,
        msg: "用户创建失败",
      };
    } else {
      return {
        code: 403,
        msg: "无效的验证码！",
      };
    }
  }

  @Authorized()
  @Post("/logout")
  public async logout(@Session() session: any) {
    delete session.token;
    delete session.user_name;
    return {
      code: 200,
      msg: "退出成功",
    };
  }

  @Post("/getUserInfo")
  public async getUserInfo() {}
}
