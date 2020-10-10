 
import { api } from '@/utils/fetch/api';

export class UserProvider {
  /**
   * 用户登录
   * @param data
   */
  static async login(data): Promise<IUser> {
    return api.post("/auth/login", data);
  }

  /**
   * 用户注册
   * @param data
   */
  static async register(data): Promise<IUser> {
    return api.post("/user/register", data);
  }

  /**
   * 获取用户
   * @param params
   */
  static getUsers(params): Promise<[IUser[], number]> {
    return api.get("/user", { params });
  }

  /**
   * 更新用户信息
   * @param data
   */
  static async update(data): Promise<IUser> {
    return api.post("/user/update", data);
  }

  /**
   * 更新用户密码
   * @param data
   */
  static async updatePassword(data): Promise<IUser> {
    return api.post("/user/password", data);
  }
}
