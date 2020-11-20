import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  AxiosResponse,
} from "axios";
import store from "@/lib/redux";
import { push } from "connected-react-router";
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

let httpCode = {
  //常见的http状态码信息，可以自己去调整配置
  400: "请求参数错误",
  401: "权限不足, 请重新登录",
  403: "服务器拒绝本次访问",
  404: "请求资源未找到",
  500: "内部服务器错误",
  501: "服务器不支持该请求中使用的方法",
  502: "网关错误",
  504: "网关超时",
};

const apiWithoutToken = [
  /**
   * 不加token的接口
   */
  "/index/home",
];

const pending: any[] = [];
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
  baseURL: process.env.REACT_APP_ENV === "production" ? "/api" : "/api", // 测试环境
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

    const user = store.getState().user.user;
    const token = user && user.token;
    if (!token) {
      // store.dispatch(push("/login"));
    }

    if (token && /[\u4e00-\u9fa5]/g.test(token)) {
      return config;
    }

    const flag = apiWithoutToken.some(
      (item) => config.url && config.url.includes(item)
    );
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
    new Error(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  function (response) {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    cancelPending(response.config);
    return likePost(response);
  },
  (
    error: AxiosError<{
      message: string;
    }>
  ) => {
    new Error(error);
    return Promise.reject(error);
  }
);

class Error {
  constructor(error) {
    this.init(error);
  }

  init(error) {
    if (error.response) {
      let tips: string;
      switch (error.response.status) {
        case 400:
          tips = "请求参数错误";
          break;
        case 401:
          tips = "权限不足, 请重新登录";
          break;
        case 403:
          tips = "服务器拒绝本次访问";
          break;
        case 404:
          tips = "请求资源未找到";
          break;
        case 500:
          tips = "内部服务器错误";
          break;
        case 501:
          tips = "服务器不支持该请求中使用的方法";
          break;
        case 502:
          tips = "网关错误";
          break;
        case 504:
          tips = "网关超时";
          break;
        default:
          tips = "网络繁忙，请稍后重试！";
          break;
      }
      message.error({
        content: tips,
      });

      if (error.response.status === 401) {
        // token或者登陆失效情况下跳转到登录页面
        // store.dispatch(push(`/login`));
      }
    } else {
    }
  }
}
