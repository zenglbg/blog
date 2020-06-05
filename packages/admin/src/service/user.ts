import { map } from "rxjs/operators";
import { Http } from "../utils";
import { message } from "antd";

export class Usersr {
  public static register<T>(data: T) {
    /**
     * 返回true 为注册成功 false 为注册失败。
     * 为true总调用登录
     */
    return Http.post("/user/register", data);
  }

  public static login<T>(body: T) {
    return Http.post("/auth/login", body);
  }

  /**
   * getUsers
   * @param parmas
   */
  public static getUsers(query?: any) {
    return Http.get("/user", query);
  }
}
