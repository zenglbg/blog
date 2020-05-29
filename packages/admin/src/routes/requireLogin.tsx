import React, { ReactElement, useState } from "react";

interface Props {}

export default function (Component) {
  if (Component.requireLogin) {
    return Component.requireLogin;
  }

  function requireLogin(props) {
    // 判断登陆
    const token = sessionStorage.getItem("token");
    // 未登陆重定向到登陆页面
    const pathname =
      props.location.pathname !== "/login" ||
      props.location.pathname !== "/register";
    if (!token && pathname) {
      props.history.push("/login");
    }

    return token ? <Component {...props}>{props.children}</Component> : null;
  }

  Component.requireLogin = requireLogin;
  return Component.requireLogin;
}
