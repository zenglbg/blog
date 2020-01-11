import "reflect-metadata";
import * as path from "path";
import * as serve from "koa-static";
// import * as koaBody from 'koa-body';

import { createKoaServer } from "routing-controllers";
import { MysqlConfig } from "config";

import { distPath, configs } from "./config/config";

const app = createKoaServer({
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`]
});

app.use(serve(distPath));

const mysqlConfig = configs.mysql as MysqlConfig;

export default app;
