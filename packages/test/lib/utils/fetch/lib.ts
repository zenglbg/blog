import { AxiosResponse } from "axios";
import { message } from "antd";

export function likePost(res: AxiosResponse) {
  if (
    res &&
    res.status === 200 &&
    res["data"] &&
    /^100\d{2}/.test(res["data"]["statusCode"])
  ) {
    // 后台验证失败主动抛出错误，有全局错误处理提示错误文字弹出
    // throw new Error(res.data["errorMessage"]);
    res.data["errorMessage"] && message.error(res.data["errorMessage"]);
  } else if (
    res &&
    /^20\d$/.test(`${res.status}`) &&
    res["data"] &&
    res["data"]["success"]
  ) {
    const data = res["data"];

    if (!data.success) {
      message.error(data.msg);
      return;
    }

    return data["data"];
  }
  return res;
}
