import { registerAs } from "@nestjs/config";
import { ConnectionOptions } from "typeorm";
import { redisBaseConfig, appUrl } from "./config.base";

const mail = {
  host: "smtp.qq.com", // 地址
  port: 465, // 端口
  secure: true, // TLS 设置
  auth: {
    user: "xxx@qq.com", // 账号
    pass: "your", // 密码
  },
};

// 微信相关配置
const wechat = {
  base_uri: "https://api.weixin.qq.com/", // 基础 url
  open_platform_base_uri: "https://api.weixin.qq.com/", // 微信开放平台
  payment_base_uri: "https://api.mch.weixin.qq.com/", // 微信支付
  open_work_base_uri: "https://qyapi.weixin.qq.com/", // 企业微信服务商
  work_base_uri: "https://qyapi.weixin.qq.com/", // 企业微信

  /**
   * 公众号
   */
  official_account: {
    app_id: "",
    secret: "",
    token: "",
    encoding_aes_key: "",
    oauth: {
      scopes: "snsapi_userinfo",
      callback: "",
    },
  },

  /**
   * 小程序
   */
  mini_program: {
    app_id: "your",
    secret: "your",
    token: "",
    encoding_aes_key: "",
  },

  payment: {
    sandbox: false, // 沙箱模式
    app_id: "your",
    mch_id: "your",
    key: "your", // API 密钥
    pfx: "/public/cert/apiclient_cert.p12", // 相对路径
    notify_url: `${appUrl}/orders/notify`, // 默认的订单回调地址
    spbill_create_ip: "127.0.0.1", // IP 地址
    sub_mch_id: "",
    sub_appid: "",
  },
};

const queue = {
  enable: false, // 是否开启队列
  redis: {
    ...redisBaseConfig,
    db: 7,
  },
};

const exceptionNotify = {
  enable: false, // 是否打开异常通知
  type: "dingtalk" as "dingtalk", // 异常通知类型，wechat 微信； mail 邮件；dingtalk 钉钉：更多...
  wechatOpt: {
    touser: "xxxxx", // 接收通知的用户 open_id
    templateId: "xxxxx", // 模板消息的 id
  },
  emailOpt: {
    to: "xxxxx", // 接收通知的用户邮件地址
    from: mail.auth.user,
  },
};

// socket.io 配置
const io = {
  iinit: {
    wsEngine: "uws", // 使用 uws 来代替默认的 us
  },
  namespace: {
    "/": {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
    "/loginQrCode": {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
  },
  redis: {
    ...redisBaseConfig,
    auth_pass: redisBaseConfig.password,
    db: 6,
  },
};

export default registerAs("api", () => ({
  // redis 配置 [ 后面如果需要对某一业务进行缓存的时候，可以开启多实例来进行特定储存 ]
  mail,
  wechat,
  queue,
  exceptionNotify,
  io
}));
