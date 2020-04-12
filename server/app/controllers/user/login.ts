import { User, EmailUser, Profiles } from "../../model/entity";
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
  CurrentUser,
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

  @Post("/login")
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
          user_name,
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

  @Post("/auth")
  public async authCode(
    @Req() req: Request,
    @Body({ validate: true })
    user: User & EmailUser
  ) {
    const { user_name, user_email, validate_code } = user;

    // 验证码是否正确
    const email: EmailUser = await this.mysql.findOne(EmailUser, {
      user_name,
      user_email,
      validate_code,
    });
    if (email && email.usable === 2 && email.dead_line > new Date().getTime()) {
      return {
        code: 200,
        msg: "验证通过",
      };
    } else {
      await this.mysql.update(EmailUser, { validate_code }, { usable: 1 });

      return {
        code: 403,
        msg: "无效的验证码！",
      };
    }
  }

  @Post("/register")
  public async register(
    @Req() req: Request,
    @Body({ validate: true })
    user: User & { user_email: string; validate_code: string }
  ) {
    const { user_name, user_email, user_password, validate_code } = user;
    // 验证用户是否存在
    const is_exist = await this.mysql.findOne(User, { user_name });
    if (is_exist) {
      return {
        code: 206,
        msg: "用户已存在",
      };
    }
    // 验证码是否正确
    const email: EmailUser = await this.mysql.findOne(EmailUser, {
      user_name,
      validate_code,
    });
    if (email && email.usable === 2 && email.dead_line > new Date().getTime()) {
      const hash_password = await this.auth.crypto(
        this.saltRounds,
        user_password
      );
      const user_ip = this.utils.getIp(req);
      const user_avatar = "images/men.png";

      const profile = {
        user_avatar,
        user_email,
      };
      const create = await this.mysql.save(User, {
        ...user,
        user_ip,
        user_avatar,
        user_password: hash_password,
        profile,
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
      await this.mysql.update(EmailUser, { validate_code }, { usable: 1 });

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
  public async getUserInfo(@CurrentUser({ required: true }) check: any) {
    console.log(3333, "user_name", check.user_name);
    const profiles = await User.createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile")
      .getOne();
    return {
      code: 200,
      data: profiles,
    };
  }
}
