import { createAction, ActionType } from "typesafe-actions";

export class ActionUser {
  public static profiles = createAction("PROFILES")();
  public static profiles0 = createAction(
    "PROFILES0",
    /**profiles 为用户信息对象 **/ (profiles) => profiles
  )();
  public static profiles1 = createAction("PROFILES1", (err) => err)();

  public static register = createAction(
    "REGISTER",
    (info: { user_name: string; user_email: string; user_password: string }) =>
      info
  )();

  public static doLogin = createAction(
    "LOGIN",
    (login: { name: string; password: string }) => login
  )();
  public static loginS = createAction("LOGIN_SUCCESS", (user) => user)();
  public static loginE = createAction("LOGIN_ERROR", (user) => user)();
}
