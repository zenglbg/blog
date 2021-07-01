import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { Observable } from "rxjs";
// 创建axios实例
const instance: AxiosInstance = axios.create({
  //创建axios实例，在这里可以设置请求的默认配置
  timeout: Number(process.env.VUE_APP_TIMEOUT), // 设置超时时间5s
  baseURL:
    process.env.VUE_APP_ENV === "production"
      ? "https://web-asia.smxjoiai.xyz"
      : "/api", // 测试环境
  withCredentials: true,
  headers: {
    post: {
      //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  },
});

instance.interceptors.response.use(
  (response) => {
    if (response && response.status === 200 && response["data"]) {
      return response["data"];
    }
    return response;
  }, //请求失败
  (error) => {
    const { response } = error;
    if (response) {
      //请求已发出，但是不在2xx的范围    ------错误处理、token过期等
      console.log(`打印失败response`, response);
      // errorHandle(response.status, response.data.message);
      return Promise.reject(response.data);
    } else {
      // 处理断网的情况
    }
  }
);

export default (config: AxiosRequestConfig) => {
  return new Observable((observer) => {
    instance(config)
      .then((res) => {
        observer.next(res);
      })
      .catch((err) => observer.error(err));
  });
};
