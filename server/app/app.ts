import "reflect-metadata";
// import * as koaBody from 'koa-body';
import next from "next";
import { createKoaServer, Action } from "routing-controllers";
import { MysqlConfig } from "config";

import { distPath, configs } from "./config/config";

const app = createKoaServer({
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
  }
});

const mysqlConfig = configs.mysql as MysqlConfig;

export { app as default };
