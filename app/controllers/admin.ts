import { Admin } from "../model/entity/admin";
import { Ctx, Param, Get, Post, JsonController } from "routing-controllers";
// import crypto from "crypto";
import { Container } from "typedi";
import { Context } from "koa";

@JsonController("/api")
export default class {
  @Post("/login")
  async login(@Ctx() ctx: Context) {
    // const admin = new Admin();
    // admin.name = "tom";
    // admin.password = "123";
    // admin.save();
    const { user, passwd } = (ctx.request as any).body;
    console.log(123, user, passwd);
    const { password } = await Admin.findOne({ name: user });
    const isRight = passwd === password;
    return {
      code: isRight ? 1000 : 1003,
      user,
      passwd,
      msg: isRight ? "登录成功" : "帐号或密码错误"
    };
  }
}
