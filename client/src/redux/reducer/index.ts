import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";
import userReducer from "./user";
import articleReducer from "./article";
import tag from "./tag";
import category from "./category";

export type UserState = StateType<typeof userReducer>;
export type ArticleState = StateType<typeof articleReducer>;
export type TagState = StateType<typeof tag>;
export type Category = StateType<typeof category>;

export interface IState {
  router: RouterState;
  user: UserState;
  article: ArticleState;
  tag: TagState;
  category: Category;
  [p: string]: any;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    article: articleReducer,
    tag,
    category
  });
