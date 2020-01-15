import { combineReducers } from "redux";
import userReducer from "./user";
import { StateType } from "typesafe-actions";

export type UserState = StateType<typeof userReducer>;

export interface IState {
  user: UserState;
  [p: string]: any;
}

export const rootReducer = combineReducers({ user: userReducer });
