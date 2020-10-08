import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { likePost } from "./lib";
export class Http {
  public static post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Observable<any> {
    return from(api.post(url, data, config)).pipe(map(likePost));
  }

  /**
   * static patch
   */
  public static patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return from(api.patch(url, data, config)).pipe(map(likePost));
  }

  /**
   * static delete
   *
   */
  public static delete(url: string, data?: any, config?: AxiosRequestConfig) {
    return from(
      api.delete(url, {
        ...config,
        data,
      })
    ).pipe(map(likePost));
  }

  public static get(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Observable<any> {
    if (!!data) {
      if (`${data}`.includes("Object")) {
        const params = Object.keys(data).reduce((acc, item) => {
          return acc ? `${acc}&${item}=${data[item]}` : `${item}=${data[item]}`;
        }, "");
        url = url.slice(-1) === "?" ? `${url}${params}` : `${url}?${params}`;
      }
    }

    return from(api.get(url, config)).pipe(map(likePost));
  }
}
