import * as http from "http";
import * as path from "path";
import { createConnection } from "typeorm";
import serve from "koa-static";
import app, { appNext, handle } from "./app";
import { port, host } from "./config/config";

interface I_server {
  port: number;
  host: string;
  init(): any;
}

class Server implements I_server {
  public port: number;
  public host: string;

  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
    this.init();
  }

  public init() {
    app.use(async ctx => {
      // console.log(ctx, 123, ctx.req, 3333, ctx.res);
      // handle(ctx.req, ctx.res);
      await appNext.render(ctx.req, ctx.res, ctx.path, ctx.query);
    });

    const currentApp = app.callback();

    const server = http.createServer(currentApp);

    server.listen(this.port, () => {
      console.log(`
            app running : http://${this.host}:${this.port}
        `);
    });
  }
}

createConnection()
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    await appNext.prepare();
    new Server(port, host);
  })
  .catch(error => console.log(error));
