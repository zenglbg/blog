import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import qs_string from "qs";
import { errCode } from "../config";
const apiWithoutToken = [
  /**
   * 不加token的接口
   */
  "/index/home",
];

const baseURL = "http://localhost:3000/api";

export const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
  withCredentials: true, //存主cookie
});

// POST传参序列化
axios.interceptors.request.use(
  (config) => {
    if (config.method === "post" || config.method === "get") {
      console.log(config);
      // config.data = qs_string.stringify(config.data);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.request.use(
  (config) => {
    const token = "";
    if (token && /[\u4e00-\u9fa5]/g.test(token)) {
      return config;
    }
    const flag = apiWithoutToken.reduce((acc, item) => {
      return config.url.includes(item);
    }, false);

    if (!flag && token) {
      // 判断是否存在token，如果存在的话，则在apis新接口每个request header都加上token
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    let err = new CatchError(error);
    return Promise.reject(err);
  }
);

/**
 * 获取发送异常信息接口
 */
export const getLogUrl = function () {
  const logUrl = localStorage.getItem("log_url");
  return logUrl ? logUrl : "";
};

class CatchError {
  message: string = errCode.DEFAULT;
  status: string = "接口异常，无法获取状态码！";
  errUrl: string = "无法获取报错接口url！";
  logUrl: string;
  params: any;
  error: any;

  constructor(error) {
    this.message = errCode.DEFAULT;
    this.logUrl = getLogUrl();
    this.params = {
      type: 1,
      level: 2,
      data: null,
      msg: null,
    };
    // this.error = null;
    this.init(error);
    return this.error;
  }

  init(error) {
    this.error = this.dealResData(error);
    this.sendErrorToBackend();
  }

  dealResData(error) {
    try {
      if (error) {
        // http状态码
        error.status =
          (error.response && error.response.status) || error.status;
        switch (error.status) {
          case 401:
            error.message = errCode.__401__;
            break;
          case 403:
            error.message = errCode.__403__;
            break;
          case 404:
            error.message = errCode.__404__;
            break;
          case 500:
            error.message = errCode.__500__;
            break;
          case 501:
            error.message = errCode.__501__;
            break;
          case 502:
            error.message = errCode.__502__;
            break;
          case 503:
            error.message = errCode.__503__;
            break;
          default:
            error.message = errCode.DEFAULT;
            break;
        }
        if (error.config && error.config.url && error.config.baseURL) {
          this.errUrl = error.config.url.split(error.config.baseURL)[1];
        }
        this.message = error.message;
        this.status =
          (error.response && error.response.status) ||
          error.status ||
          this.status;
      }
    } finally {
      this.params.data = this.errUrl;
      this.params.msg = this.status;
      if (this.errUrl && !/[\u4E00-\u9FA5]+/.test(this.errUrl)) {
      }
    }
    return error;
  }

  sendErrorToBackend() {
    let id = this.params.data;
    let uniqueEle = document.getElementById(id);
    let paramsStr = "?";
    let url = "";
    let body = document.body;
    for (let k in this.params) {
      paramsStr += `${k}=${this.params[k]}&`;
    }
    url = `${this.logUrl}${paramsStr.slice(0, -1)}`;
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    if (uniqueEle !== null) {
      body.removeChild(uniqueEle);
    }
    body.appendChild(script);
  }
}
