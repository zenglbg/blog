import axios from "axios";
import { message } from "antd";
import Router from "next/router";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `https://api.${process.env.NODE_DOMAIN}/api`
      : "http://localhost:8888/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },

  (err) => {
    throw new Error("发起请求出错");
  }
);

api.interceptors.response.use(
  (data) => {
    if (data.status && data.status == 200 && data.data.status == "error") {
      typeof window !== "undefined" &&
        message.error({ message: data.data.msg });
      return;
    }

    const res = data.data;

    if (!res.success) {
      console.log(res, res.success);
      typeof window !== "undefined" && message.error(res.msg);
      return;
    }

    return res.data;
  },
  (err) => {
    if (err && err.response && err.response.status) {
      const status = err.response.status;

      switch (status) {
        case 504:
        case 404:
          typeof window !== "undefined" && message.error("服务器异常");
          break;

        default:
          typeof window !== "undefined" &&
            message.error(
              (err.response && err.response.data && err.response.data.msg) ||
                "未知错误!"
            );
      }
    }

    return Promise.reject(err);
  }
);
