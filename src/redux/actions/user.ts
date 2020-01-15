import { USER } from "../constants";
import { createAction, ActionType } from "typesafe-actions";
import { IUserState } from '../reducer/user'
export type UserAction = ActionType<typeof userActions>;

export namespace userActions {
  export const doLogin = createAction(USER.LOGIN ,  user => user)<IUserState>();
}
