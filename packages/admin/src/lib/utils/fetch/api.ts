import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import qs_string from "qs";
import { push } from "connected-react-router";
import { ActionUser } from "@lib/redux/actions/index";
import store from "../../redux";
import { errCode } from "../config";
import { message } from "antd";

const apiWithoutToken = [
  /**
   * 不加token的接口
   */
  "/index/home",
];

const pending = [];
const CancelToken = axios.CancelToken;

/**
 * 请求前检查是否存在相同请求未响应；
 * 如果存在未响应的相同请求，则直接干掉。发起新的请求；
 */
const cancelPending = (config: AxiosRequestConfig) => {
  pending.forEach((item, index) => {
    if (config) {
      if (item.UrlPath === config.url) {
        item.Cancel(); // 取消请求
        pending.splice(index, 1); // 移除当前请求记录
      }
    } else {
      item.Cancel(); // 取消请求
      pending.splice(index, 1); // 移除当前请求记录
    }
  });
};

export const api: AxiosInstance = axios.create({
  timeout: Number(process.env.REACT_APP_TIMEOUT), // 设置超时时间5s
  baseURL:
    process.env.REACT_APP_ENV === "production"
      ? "/api"
      : "http://localhost:9999/api", // 测试环境
  withCredentials: false,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // POST传参序列化

    // if (config.method === "post" || config.method === "get") {
    //   config.data = qs_string.stringify(config.data);
    // }

    // 登录流程控制中，根据本地是否存在token判断用户登录情况
    // 但是即使token存在，也可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态吗
    // 而后我们可以在响应拦截器中，根据状态吗进行一些统一的操作。
    // 用户信息

    const token = store.getState().user.token;
    if (token && /[\u4e00-\u9fa5]/g.test(token)) {
      return config;
    }

    const flag = apiWithoutToken.some((item) => config.url.includes(item));

    if (!flag && token) {
      // 判断是否存在token，如果存在的话，则在apis新接口每个request header都加上token
      config.headers.token = token;
    }

    cancelPending(config);
    config.cancelToken = new CancelToken((res) => {
      pending.push({ UrlPath: config.url, Cancel: res });
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  function (response) {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    cancelPending(response.config);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
