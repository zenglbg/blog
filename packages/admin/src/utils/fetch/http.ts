import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

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
          res["data"]["statusCode"] === 400 &&
          res["data"]["errorMessage"]
        ) {
          // 后台验证失败主动抛出错误，有全局错误处理提示错误文字弹出
          throw new Error(`validation,${res.data.errorMessage}`);
        }
        return res;
      })
    );
  }
  static get(url: string, config?: AxiosRequestConfig): Observable<any> {
    return from(api.get(url, config));
  }
}
