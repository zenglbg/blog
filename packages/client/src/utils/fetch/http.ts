import { AxiosRequestConfig } from "axios";
import { api } from "./api";
export interface AxiosResponse<T = any> {
  code: string | number;
  msg: string | number;
  success: string | number;
  data: T;
}

export class Http {
  public static post(url: string, data?: any, config?: AxiosRequestConfig) {
    return api.post<any, AxiosResponse<any> & any[] & string>(
      url,
      data,
      config
    );
  }

  
  public static get(url: string, data?: any, config?: AxiosRequestConfig) {
    if (!!data) {
      if (`${data}`.includes("Object")) {
        const params = Object.keys(data).reduce((acc, item) => {
          return acc ? `${acc}&${item}=${data[item]}` : `${item}=${data[item]}`;
        }, "");
        url = url.slice(-1) === "?" ? `${url}${params}` : `${url}?${params}`;
      }
    }

    return api.get<any, AxiosResponse<any> & any[] & string>(url, config);
  }
  /**
   * static patch
   */
  public static patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return api.patch<any, AxiosResponse<any> & any[] & string>(
      url,
      data,
      config
    );
  }

  /**
   * static delete
   *
   */
  public static delete(url: string, data?: any, config?: AxiosRequestConfig) {
    return api.delete<any, AxiosResponse<any> & any[] & string>(url, {
      ...config,
      data,
    });
  }
}
