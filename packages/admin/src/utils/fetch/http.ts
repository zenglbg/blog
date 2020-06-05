import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { message } from "antd";

export class Http {
  static post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Observable<any> {
    return from(api.post(url, data, config)).pipe(
      map((res) => {
        if (
          res &&
          res.status === 200 &&
          res["data"] &&
          /^100\d{2}/.test(res["data"]["statusCode"])
        ) {
          // 后台验证失败主动抛出错误，有全局错误处理提示错误文字弹出
          // throw new Error(res.data["errorMessage"]);
          res.data["errorMessage"] && message.error(res.data["errorMessage"]);
        } else if (res && /^20\d$/.test(`${res.status}`)) {
          return res["data"];
        }
        return res;
      })
    );
  }
  static get(url: string, data, config?: AxiosRequestConfig): Observable<any> {
    if (`${data}`.includes("Object")) {
      const params = Object.keys(data).reduce((acc, item) => {
        return acc ? `${acc}&${item}=${data[item]}` : `${item}=${data[item]}`;
      }, "");
      url = url.slice(-1) === "?" ? `${url}${params}` : `${url}?${params}`;
    }

    return from(api.get(url, config));
  }
}
