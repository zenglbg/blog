import * as path from "path";
import * as fs from "fs";

const files = fs.readdirSync(__dirname);
const ts_files = files.filter((f) => f.endsWith(".ts") && f !== "index.ts");

export * from "./admin";
export * from "./article";
export * from "./category";
export * from "./example";
export * from "./star";
export * from "./tag";

export * from "./articles";
export * from "./comment";
export * from "./floors";
export * from "./friend_links";
export * from "./labels";
export * from "./menus";
export * from "./moderator";
export * from "./options";
export * from "./posts";
export * from "./set_labels";
export * from "./set_sorts";
export * from "./sorts";
export * from "./star";
export * from "./submenus";
export * from "./tag";
export * from "./users";
export * from "./emailUser";
export * from "./user_friends";
export * from "./profiles";
