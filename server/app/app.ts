import "reflect-metadata";
// import * as koaBody from 'koa-body';
import * as path from "path";
import * as express from "express";
import * as session from "express-session";
import * as Redis from "ioredis";
import * as connectRedis from "connect-redis";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";

import {
  Action,
  useExpressServer,
  useContainer,
  UnauthorizedError,
  ForbiddenError,
} from "routing-controllers";
import { Container } from "typedi";

const jwtKey = process.env.JWTKEY || "complexKey";
const client = new Redis({});
const RedisStore = connectRedis(session);
const store = new RedisStore({
  client,
  host: "127.0.0.1",
  port: 6379,
  ttl: 3000, // 会话保存在redis的时间，单位s
  db: 4,
  pass: "",
  prefix: "blog",
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
app.use(express.static(path.resolve(__dirname, "./public/")));
useContainer(Container);

useExpressServer(app, {
  cors: true,
  defaultErrorHandler: false,
  middlewares: [`${__dirname}/middlewares/**/*{.js,.ts}`],
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers["authorization"];
    if (!token) {
      throw new UnauthorizedError("没有登录");
    }
    let check: boolean;

    jwt.verify(token, jwtKey, (err: Error, success: any) => {
      if (err) {
        check = false;
      } else {
        check = true;
      }
    });
    if (check) {
      return check;
    }
    throw new ForbiddenError("登录过期，没有权限");
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers["authorization"];
    const check = confirmUser(token);
    return check;
  },
});
async function confirmUser(token: any) {
  return await new Promise((ok, fail) => {
    jwt.verify(token, jwtKey, (error: any, success: any) => {
      if (error) {
        fail({ user: null, currentuser: false });
      } else {
        ok({ user: success.data.username, currentuser: true });
      }
    });
  });
}
export { app as default };
