import * as path from "path";
import { ConfigMap } from "config";
import { configs as pro } from "./backend/production";
import { configs as dev } from "./backend/development";
import { configs as local } from "./backend/local";

const env = process.env.NODE_ENV;
const isDev = env === "development";
const isPro = env === "production";
const isLocal = env === "local" || env === "local_dev";

let port: string | number;
const host: string = "0.0.0.0";

const distPath = path.resolve(__dirname, "../../public");

let configs: ConfigMap;

switch (true) {
  case isPro:
    configs = pro;
    port = "9998";
    break;
  case isDev:
    configs = dev;
    port = "9999";
    break;
  case isLocal:
  default:
    configs = local;
    port = "9998";
}
export { port, host, isDev, isPro, isLocal, distPath, configs };
