import { ElMessage } from 'element-plus';
import { _AsyncData } from 'nuxt3/dist/app/composables/asyncData';

const baseUrl = '/api/v1';
// 指定后端返回的基本数据类型
export interface ResponseConfig {
  code: number;
  status: number;
  data: any;
  msg: string;
}
export interface ValueConfig {
  value: any;
}

const fetch = (url: string, options?: any): Promise<any> => {
  const reqUrl = baseUrl + url;
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options })
      .then(({ data, error }: _AsyncData) => {
        if (error.value) {
          reject(error.value);
          return;
        }
        const value = data.value;
        if (!value) {
          // 这里处理错误回调
          // reject(value)
          // $router.replace('/reject/' + value.status)
        } else if (value.code == 102) {
          ElMessage({
            message: value.msg,
            type: 'error',
          });
        } else {
          resolve(ref(value));
        }
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default class Http {
  static get(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params });
  }

  static post(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'post', body });
  }

  static put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body });
  }

  static delete(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body });
  }
}
