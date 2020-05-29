import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";
import userReducer from "./user";

export type UserState = StateType<typeof userReducer>;

export interface IState {
  router: RouterState;
  user: UserState;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });
