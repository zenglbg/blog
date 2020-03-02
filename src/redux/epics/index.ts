import { combineEpics } from "redux-observable";
import { userEpic } from "./user";
import { get_articleEpic, del_articleEpic } from "./article";

export const rootEpics = combineEpics(
  userEpic,
  get_articleEpic,
  del_articleEpic
);
