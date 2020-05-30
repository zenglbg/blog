import { createAction, ActionType } from "typesafe-actions";

export class User {
  public static REGISTER = "REGISTER";
  public static LOGIN: string = "LOGIN";
  public static LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
  public static LOGIN_ERROR: string = "LOGIN_ERROR";
  public static PROFILES = "PROFILES";
  public static PROFILES0 = "PROFILES0"; // 0表示成功
  public static PROFILES1 = "PROFILES1"; // 1表示失败

  public static profiles = createAction(User.PROFILES)();
  public static profiles0 = createAction(
    User.PROFILES0,
    /**profiles 为用户信息对象 **/ (profiles) => profiles
  )();
  public static profiles1 = createAction(User.PROFILES1, (err) => err)();

  public static register = createAction(
    User.REGISTER,
    (info: { user_name: string; user_email: string; user_password: string }) =>
      info
  )();

  public static doLogin = createAction(
    User.LOGIN,
    (login: { name: string; password: string }) => login
  )();
  public static loginS = createAction(User.LOGIN_SUCCESS, (user) => {
    sessionStorage.setItem("token", user.token);
    return user;
  })();
  public static loginE = createAction(User.LOGIN_ERROR, (user) => user)();
}
