import * as path from "path";
import { ConfigMap } from "config";

export const configs: ConfigMap = {
  mysql: {
    host: ["127.0.0.1"],
    user: "blog",
    password: "123",
    database: "quanibm",
    key: "mysql",
    modelPath: [
      path.join(__dirname, "../../models/user"),
      path.join(__dirname, "../../models/articles")
    ]
  }
};
