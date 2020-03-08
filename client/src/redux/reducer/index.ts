import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";
import userReducer from "./user";
import articleReducer from "./article";

export type UserState = StateType<typeof userReducer>;
export type ArticleState = StateType<typeof articleReducer>;

export interface IState {
  router: RouterState;
  user: UserState;
  article: ArticleState;
  [p: string]: any;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    article: articleReducer
  });
