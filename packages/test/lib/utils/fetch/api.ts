import axios from "axios";
import { message } from "antd";
import Router from "next/router";
console.log(`process.env.NEXT_PUBLIC_ENV`, process.env.NEXT_PUBLIC_ENV);
import { likePost } from "./lib";

export const api = axios.create({
  baseURL:
    // process.env.NEXT_PUBLIC_ENV === "development"
    //   ? `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api`
    //   : process.env.NEXT_PUBLIC_API_URL,
    process.env.NEXT_PUBLIC_ENV === "development"
      ? `http://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api`
      : `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api`,
  timeout: Number(process.env.NEXT_PUBLIC_TIMEOUT),
});

api.interceptors.request.use(
  (config) => {
    // console.log(config.url);
    return config;
  },

  (err) => {
    throw new Error("发起请求出错");
  }
);

api.interceptors.response.use(
  likePost,
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
