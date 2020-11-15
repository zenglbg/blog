import { Http } from "@lib/utils/fetch/http";

export class SettingApi {
  /**
   * 获取设置
   */
  static getSetting() {
    return Http.post("/setting/get");
  }

  /**
   * 更新设置
   */
  static updateSetting(data) {
    return Http.post(`/setting`, data);
  }
}
