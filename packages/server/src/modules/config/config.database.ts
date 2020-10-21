import { registerAs } from "@nestjs/config";
import { ConnectionOptions } from "typeorm";
import { redisBaseConfig } from "./config.base";

//   配置
const jwt = {
  secret: "your", // 密钥
  adminSecret: "your", // 后台用户的密钥
  enable: true, // 开启
  match: "/jwt", // 白名单

  // jwt 额外配置, 我自己拓展的
  extras: {
    ttl: 2 * 7 * 24, // token 过期时间,单位: 小时
    refresh_ttl: 4 * 7 * 24, // token 可刷新的时间 [失效时间] 单位: 小时
    // iss: 'atzcl', // 令牌的签发者
    // iat: 'iat', // 令牌的发布时间 (unix时间戳）
    // exp: 'exp', // 令牌失效日期 (unix时间戳）
    // nbf: 'nbf', // 令牌从什么时候可用的时间 (unix时间戳)
    // sub: 'sub', // 令牌标识 [ 也就是存放我们自己数据的地方 ]
    // jti: 'jti', // 令牌的唯一标识符 （ sub 和 iat md5 加密后的字符）
  },
};

// redis 配置 [ 后面如果需要对某一业务进行缓存的时候，可以开启多实例来进行特定储存 ]
const redisConfig = {
  client: {
    ...redisBaseConfig,
    db: "5",
  },
  agent: true,
};

const ormConfig: ConnectionOptions = {
  type: "mysql", // support: mysql, mariadb, postgres, mssql
  charset: "utf8mb4", // 字符集
  connectTimeout: 12000,
  // 当在数据库中处理一个大数(BIGINT和DECIMAL)数据类型的时候，你需要启用这个选项(默认: false)
  supportBigNumbers: true,
  // 这个选项需要 bigNumberStrings 与 supportBigNumbers 同时启用
  // 强制把数据库中大数(BIGINT和DECIMAL)数据类型的值转换为 javascript 字符对象串对象返回。(默认:false)
  bigNumberStrings: true,
  timezone: "+08:00", // 东八时区
};

// sequelize 配置
// const sequelize: SequelizeOptions = {
//   dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
//   database: 'blog', // 数据库名称
//   host: process.env.mysqlHost || '127.0.0.1', // 数据库地址
//   port: Number(process.env.mysqlPort) || 3303, // 数据库端口
//   username: process.env.mysqlUser || 'root', // 用户名
//   password: process.env.mysqlPasswd || 'qwe123qqq', // 密码
//   // 禁/使用日志; 默认值: console.log
//   logging: console.log,
//   // 链接数据库时的可选参数
//   dialectOptions: {
//     charset: 'utf8mb4', // 字符集
//     collate: 'utf8mb4_unicode_ci', // 校对集
//     // 当在数据库中处理一个大数(BIGINT和DECIMAL)数据类型的时候，你需要启用这个选项(默认: false)
//     supportBigNumbers: true,
//     // 这个选项需要 bigNumberStrings 与 supportBigNumbers 同时启用
//     // 强制把数据库中大数(BIGINT和DECIMAL)数据类型的值转换为 javascript 字符对象串对象返回。(默认:false)
//     bigNumberStrings: true,
//   },
//   // 指定在调用 sequelize.define 时使用的选项
//   define: {
//     underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
//     charset: 'utf8mb4', // 字符集
//   },
//   timezone: '+08:00', // 东八时区
// };

export default registerAs("database", () => ({
  // redis 配置 [ 后面如果需要对某一业务进行缓存的时候，可以开启多实例来进行特定储存 ]
  jwt,
  redisConfig,
  ormConfig,
}));
