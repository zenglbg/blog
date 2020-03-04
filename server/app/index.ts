import * as http from "http";
import * as path from "path";
import { createConnection } from "typeorm";
import app from "./app";
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
    const currentApp = app.callback();

    const server = http.createServer(currentApp);

    server.listen(this.port, () => {
      console.log(`
            app running : http://${this.host}:${this.port}
        `);
    });
  }
}

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "blog",
  password: "123",
  database: "test",
  synchronize: true,
  entities: [`${__dirname}/model/**/*{.js,.ts}`]
})
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    new Server(port, host);
  })
  .catch(error => console.log(error));
