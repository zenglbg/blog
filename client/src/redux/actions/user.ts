import { createAction, ActionType } from "typesafe-actions";

export class User {
  public REGISTER = "REGISTER";
  public LOGIN: string = "LOGIN";
  public LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
  public LOGIN_ERROR: string = "LOGIN_ERROR";

  public static user: User;
  public static get instance() {
    if (!this.user) {
      this.user = new User();
    }
    return this.user;
  }

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
