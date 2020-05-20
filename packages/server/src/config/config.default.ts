// 后台路由前缀
export const adminPrefix = 'system';

// 应用的 url 前缀
export const appUrl = 'https://xxx.com';

// 静态资源的 url 集合配置，用于前端拼接完整的资源路径
export const staticUrls = {
  default: appUrl,
};

const mail = {
  host: 'smtp.qq.com', // 地址
  port: 465, // 端口
  secure: true, // TLS 设置
  auth: {
    user: 'xxx@qq.com', // 账号
    pass: 'your', // 密码
  },
};

const redisBaseConfig = {
  host: process.env.redisHost || '127.0.0.1',
  port: process.env.redisPort || 6379,
  password: '',
  db: 1,
};

export const customizeConfig = {
  redis: {
    client: {
      ...redisBaseConfig,
      db: 5,
    },
    agent: true,
  },

  mysql: {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'your', // 数据库名称
    host: '127.0.0.1', // 数据库地址
    port: '3306', // 数据库端口
    username: 'root', // 用户名
    password: 'your', // 密码
    // 禁/使用日志; 默认值: console.log
    logging: console.log,
    // 链接数据库时的可选参数
    dialectOptions: {
      charset: 'utf8mb4', // 字符集
      collate: 'utf8mb4_unicode_ci', // 校对集
      // 当在数据库中处理一个大数(BIGINT和DECIMAL)数据类型的时候，你需要启用这个选项(默认: false)
      supportBigNumbers: true,
      // 这个选项需要 bigNumberStrings 与 supportBigNumbers 同时启用
      // 强制把数据库中大数(BIGINT和DECIMAL)数据类型的值转换为 javascript 字符对象串对象返回。(默认:false)
      bigNumberStrings: true,
    },
    // 指定在调用 sequelize.define 时使用的选项
    define: {
      underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
      charset: 'utf8mb4', // 字符集
    },
    timezone: '+08:00', // 东八时区
  },

  jwt: {
    secret: 'your', // 密钥
    adminSecret: 'your', // 后台用户的密钥
    enable: true, // 开启
    match: '/jwt', // 白名单

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
  },

  myApp: {
    appName: 'lbg', // 应用名称
    debug: false, //是否本地开发环境
    staticUrls, // 静态状态跟域名
    appUrl, // 应用的 url
    adminPrefix, // 后台路由前缀
    language: 'cn', // 当前语言
    languageType: {
      // 语言列表，配合 language 当前语言来用于后面查询时，可以判断应该输出何种语言的数据
      cn: 0,
      en: 1,
    },

    mail,

    queue: {
      enable: false, // 是否开启队列
      redis: {
        ...redisBaseConfig,
        db: 7,
      },
    },

    //异常通知配置
    exceptionNotify: {
      enable: false, // 是否打开异常通知
      type: 'dingtalk' as 'dingtalk', // 异常通知类型，wechat 微信； mail 邮件；dingtalk 钉钉：更多...
      wechatOpt: {
        touser: 'xxxxx', // 接收通知的用户 open_id
        templateId: 'xxxxx', // 模板消息的 id
      },
      emailOpt: {
        to: 'xxxxx', // 接收通知的用户邮件地址
        from: mail.auth.user,
      },
    },

    // 代理
    proxy: true,
  },
};

export interface appConfig {}
export default (appConfig: appConfig) => {
  const config: appConfig = {};

  return {
    ...config,
    ...customizeConfig,
  };
};
