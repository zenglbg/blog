import { api } from "../fetch";

export default {
  register<T>(data: T): Promise<IUser> {
    /**
     * 返回true 为注册成功 false 为注册失败。
     * 为true总调用登录
     */
    return api.post("/user/register", data);
  },

  login<T>(body: T): Promise<IUser> {
    return api.post("/auth/login", body);
  },

  /**
   * getUsers
   * @param parmas
   */
  getUsers(params = {}): Promise<[IUser[], number]> {
    return api.get("/user", params);
  },

  /**
   * update
   * update 用户
   */
  update(data: IUser): Promise<IUser> {
    return api.post("/user/update", data);
  },

  /**
   *
   * @param data 升级密码
   */
  updatePassword<T>(data: T): Promise<IUser> {
    return api.post("/user/password", data);
  },
};
