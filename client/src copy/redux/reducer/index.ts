import { combineReducers } from "redux";
import userReducer from "./user";
import articleReducer from "./article";
import { StateType } from "typesafe-actions";

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
