import * as path from "path";
import * as fs from "fs";

const files = fs.readdirSync(__dirname);
const ts_files = files.filter(f => f.endsWith(".ts") && f !== "index.ts");

export * from "./admin";
export * from "./article";
export * from "./category";
export * from "./example";
export * from "./star";
export * from "./tag";
