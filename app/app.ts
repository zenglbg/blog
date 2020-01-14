import "reflect-metadata";
import * as path from "path";
import * as serve from "koa-static";
// import * as koaBody from 'koa-body';
import next from "next";
const dev = process.env.NODE_ENV === "development";
const appNext = next({ dev });
import { createKoaServer } from "routing-controllers";
import { MysqlConfig } from "config";

import { distPath, configs } from "./config/config";

const app = createKoaServer({
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`]
});

// app.use(serve(distPath));

const mysqlConfig = configs.mysql as MysqlConfig;

export { app as default, appNext };
