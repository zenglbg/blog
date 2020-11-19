import { api } from "@lib/utils/fetch/api";

export class SettingApi {
  /**
   * 获取设置
   */
  static getSetting(): Promise<any> {
    return api.post("/setting/get");
  }

  /**
   * 更新设置
   */
  static updateSetting(data): Promise<any> {
    return api.post(`/setting`, data);
  }
}
