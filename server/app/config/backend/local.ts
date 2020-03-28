import * as path from "path";
import { ConfigMap } from "config";

export const configs: ConfigMap = {
  mysql: {
    type: "mysql",
    host: "192.168.43.144",
    port: 3306,
    username: "blog",
    password: "123",
    database: "test",
    synchronize: true,
    entities: [path.join(__dirname, "../../model/**/*{.js,.ts}")]
  }
};
