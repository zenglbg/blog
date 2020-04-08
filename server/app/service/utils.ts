import { Service } from "typedi";
import * as crypto from "crypto";
import { mailConfig } from "../config/config";
import * as nodemailer from "nodemailer";
import { Request } from "express";
import { SendMailOptions } from "nodemailer";

@Service()
export class Utils {
  public deadTime(add_time: number) {
    const now = new Date();
    return now.getTime() + add_time;
  }
  public getIp(req: Request) {
    var ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      "";

    if (ip.split(",").length > 0) {
      ip = ip.split(",")[0];
    }
    ip = ip.substr(ip.lastIndexOf(":") + 1, ip.length);
    return ip;
  }
  public code(len: number) {
    // isFinite 判断是否为有限数值
    if (!Number.isFinite(len)) {
      throw new TypeError("Expected a finite number");
    }

    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString("hex")
      .slice(0, len);
  }
  public sendCode(user_email: string, code: string, cb?: Function) {
    const mail = {
      // 发件人
      from: "<zzzibm@163.com>",
      // 主题
      subject: "接受凭证", //邮箱主题
      // 收件人
      to: user_email, //前台传过来的邮箱
      // 邮件内容，HTML格式
      text: "用" + code + "作为你的验证码", //发送验证码
    };
    const transporter = nodemailer.createTransport(mailConfig);

    transporter.sendMail(mail, async (err, info) => {
      if (err) {
        return console.log(err);
      }
      if ((info.rejected as any[]).length === 0) {
        await cb();
      }
      console.log("mail sent: ", info.response);
    });
  }
}
