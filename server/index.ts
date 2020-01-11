import * as http from "http";
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

createConnection()
  .then(async connection => {
    console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
    new Server(port, host);
  })
  .catch(error => console.log(error));
