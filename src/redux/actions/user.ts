import { USER } from "../constants";
import { createAction, ActionType, getType } from "typesafe-actions";
import { IUserState } from "../reducer/user";
export type UserAction = ActionType<typeof userActions>;

export namespace userActions {
  export const doLogin = createAction(USER.LOGIN)();
  export const loginSuccess = createAction(USER.LOGIN_SUCCESS, user => user)();
  export const loginError = createAction(USER.LOGIN_ERROR, user => user)();
}
