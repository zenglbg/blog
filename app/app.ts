import "reflect-metadata";
import * as path from "path";
import serve from "koa-static";

// import * as koaBody from 'koa-body';
import next from "next";
const dev = process.env.NODE_ENV === "development";
const appNext = next({ dev });
const handle = appNext.getRequestHandler();
import { createKoaServer, useKoaServer, Action } from "routing-controllers";
import { MysqlConfig } from "config";

import { distPath, configs } from "./config/config";

const app = createKoaServer({
  cors: true,
  middlewares: [serve(path.resolve(__dirname, "../public/static"))],
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
  authorizationChecker: async (action: Action, roles: string[]) => {
    // console.log(roles);
    console.log(action, "action");
    const token = action.request.headers["authorization"];
    if (token) return true;
    return false;
  }
});

const mysqlConfig = configs.mysql as MysqlConfig;

export { app as default, appNext, handle };
