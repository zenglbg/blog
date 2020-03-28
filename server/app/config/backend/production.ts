import * as path from "path";
import { ConfigMap } from "config";

export const configs: ConfigMap = {
  mysql: {
    type: "mysql",
    host: "104.168.247.0",
    port: 3306,
    username: "blog",
    password: "123",
    database: "blog",
    synchronize: true,
    entities: [path.join(__dirname, "../../model/**/*{.js,.ts}")]
  }
};
