import { combineEpics } from "redux-observable";
import { userEpic } from "./user";
import { articleEpic } from "./article";

export const rootEpics = combineEpics(userEpic, articleEpic);
