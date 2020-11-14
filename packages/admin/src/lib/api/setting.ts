import { Http } from "@lib/utils/fetch/http";

export class SettingApi {
  /**
   * 获取设置
   */
  static async getSetting(): Promise<any> {
    return Http.post("/setting/get");
  }

  /**
   * 更新设置
   */
  static async updateSetting(data): Promise<any> {
    return Http.post(`/setting`, data);
  }
}
