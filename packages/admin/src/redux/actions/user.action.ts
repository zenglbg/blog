import { createAction, ActionType } from "typesafe-actions";

export class ActionUser {
  public static REGISTER = "REGISTER";
  public static LOGIN: string = "LOGIN";
  public static LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
  public static LOGIN_ERROR: string = "LOGIN_ERROR";
  public static PROFILES = "PROFILES";
  public static PROFILES0 = "PROFILES0"; // 0表示成功
  public static PROFILES1 = "PROFILES1"; // 1表示失败

  public static profiles = createAction(ActionUser.PROFILES)();
  public static profiles0 = createAction(
    ActionUser.PROFILES0,
    /**profiles 为用户信息对象 **/ (profiles) => profiles
  )();
  public static profiles1 = createAction(ActionUser.PROFILES1, (err) => err)();

  public static register = createAction(
    ActionUser.REGISTER,
    (info: { user_name: string; user_email: string; user_password: string }) =>
      info
  )();

  public static doLogin = createAction(
    ActionUser.LOGIN,
    (login: { name: string; password: string }) => login
  )();
  public static loginS = createAction(ActionUser.LOGIN_SUCCESS, (user) => user)();
  public static loginE = createAction(ActionUser.LOGIN_ERROR, (user) => user)();
}
