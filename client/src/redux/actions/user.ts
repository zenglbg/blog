import { createAction, ActionType } from "typesafe-actions";

export class User {
  public REGISTER = "REGISTER";
  public LOGIN: string = "LOGIN";
  public LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
  public LOGIN_ERROR: string = "LOGIN_ERROR";
  public PROFILES = "PROFILES";
  public PROFILES0 = "PROFILES0"; // 0表示成功
  public PROFILES1 = "PROFILES1"; // 1表示失败

  public static user: User;
  public static get instance() {
    if (!this.user) {
      this.user = new User();
    }
    return this.user;
  }

  public profiles = createAction(this.PROFILES)();
  public profiles0 = createAction(
    this.PROFILES0,
    /**profiles 为用户信息对象 **/ (profiles) => profiles
  )();
  public profiles1 = createAction(this.PROFILES1, (err) => err)();

  public register = createAction(
    this.REGISTER,
    (info: { user_name: string; user_email: string; user_password: string }) =>
      info
  )();
  public doLogin = createAction(
    this.LOGIN,
    (login: { user_name: string; user_password: string }) => login
  )();
  public loginSuccess = createAction(this.LOGIN_SUCCESS, (user) => {
    sessionStorage.setItem("token", user.token);
    return user;
  })();
  public loginError = createAction(this.LOGIN_ERROR, (user) => user)();
}
