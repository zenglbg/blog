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
        console.log(res);
        return res;
      })
    );
  }
  static get(url: string, config?: AxiosRequestConfig): Observable<any> {
    return from(api.get(url, config));
  }
}
