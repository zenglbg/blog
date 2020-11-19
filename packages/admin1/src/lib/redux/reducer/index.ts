import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";
import userReducer from "./user";
import { articleReducer } from "./article";
import { pageReducer } from "./page";

export type UserState = StateType<typeof userReducer>;
export type ArticleState = StateType<typeof articleReducer>;
export type PageState = StateType<typeof pageReducer>;

export interface IState {
  router: RouterState;
  user: UserState;
  article: ArticleState;
  page: PageState;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    article: articleReducer,
    page: pageReducer,
  });
