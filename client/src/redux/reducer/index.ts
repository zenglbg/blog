import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";
import userReducer from "./user";
import articleReducer from "./article";
import tag from "./tag";
import category from "./category";
import star from "./star";
import option from "./option";

export type UserState = StateType<typeof userReducer>;
export type ArticleState = StateType<typeof articleReducer>;
export type TagState = StateType<typeof tag>;
export type Category = StateType<typeof category>;
export type Star = StateType<typeof star>;
export type Option = StateType<typeof option>;

export interface IState {
  router: RouterState;
  user: UserState;
  article: ArticleState;
  tag: TagState;
  category: Category;
  star: Star;
  option: Option;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    article: articleReducer,
    tag,
    category,
    star,
    option,
  });
