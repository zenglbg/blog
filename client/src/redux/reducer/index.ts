import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import userReducer from "./user";
import articleReducer from "./article";

export type UserState = StateType<typeof userReducer>;
export type ArticleState = StateType<typeof articleReducer>;

export interface IState {
  user: UserState;
  article: ArticleState;
  [p: string]: any;
}

export const rootReducer = combineReducers({
  user: userReducer,
  article: articleReducer
});
