import "reflect-metadata";
// import * as koaBody from 'koa-body';
import * as express from "express";
import * as session from "express-session";
import * as Redis from "ioredis";
import * as connectRedis from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as ClassValidator from "class-validator";

import { Action, useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
const client = new Redis({});
const RedisStore = connectRedis(session);
const store = new RedisStore({
  client,
  host: "127.0.0.1",
  port: 6379,
  ttl: 30, // 会话保存在redis的时间，单位s
  db: 4,
  pass: "",
  prefix: "typescript-blog-2.0",
  logErrors: true,
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    store,
    secret: "peishan",
    name: "blog.sid", // cookie name
    resave: true, // resave==true的时候，强迫每次链接都会重新设置会话的有效期。为什么不设置为true
    cookie: {
      // cookie 内容设置
      maxAge: 1000 * 60 * 24, // 一天过期 单位ms
    },
    saveUninitialized: true, // stored 设置为true则，每次都为一个为初始化的会话创建一个会话对象
  })
);
// ClassValidator.useContainer(Container);
useContainer(Container);
useExpressServer(app, {
  cors: true,
  middlewares: [
    // serve(path.resolve(__dirname, "../public/static"))
  ],
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
  authorizationChecker: async (action: Action, roles: string[]) => {
    // console.log(roles);
    console.log(action, "action");
    const token = action.request.headers["authorization"];
    if (token) return true;
    return false;
  },
});

export { app as default };
