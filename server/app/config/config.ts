import * as path from "path";
import { ConfigMap } from "config";
import { configs as pro } from "./backend/production";
import { configs as dev } from "./backend/development";
import { configs as local } from "./backend/local";

const env = process.env.NODE_ENV;
const isDev = env === "development";
const isPro = env === "production";
const isLocal = env === "local" || env === "local_dev";

const port: number = 9998;
const host: string = "0.0.0.0";

const distPath = path.resolve(__dirname, "../../public");

let configs: ConfigMap;

switch (true) {
  case isPro:
    configs = pro;
    break;
  case isDev:
    configs = dev;
    break;
  case isLocal:
  default:
    configs = local;
}

export { port, host, isDev, isPro, isLocal, distPath, configs };
