import * as path from "path";
import { ConfigMap } from "config";

export const configs: ConfigMap = {
  mysql: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "blog",
    password: "123",
    database: "test",
    synchronize: true,
    entities: [path.join(__dirname, "../../model/**/*{.js,.ts}")]
  }
};
