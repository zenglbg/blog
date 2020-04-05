import * as http from "http";
import { createConnection } from "typeorm";
import app from "./app";
import { port, host, configs } from "./config/config";

interface I_server {
  port: number | string;
  host: string;
  init(): any;
}
class Server implements I_server {
  public port: number | string;
  public host: string;

  constructor(port: number | string, host: string) {
    this.port = port;
    this.host = host;
    this.init();
  }

  public init() {
    // const currentApp = app.callback();

    const server = http.createServer(app);

    server.listen(this.port, () => {
      console.log(`
            app running : http://${this.host}:${this.port}
        `);
    });
  }
}

createConnection(configs.mysql)
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    new Server(port, host);
  })
  .catch(error => console.log(error));
