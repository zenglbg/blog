import React, { ReactElement, useState } from "react";

interface Props {}

export default function(Component) {
  if (Component.requireLogin) {
    return Component.requireLogin;
  }

  function requireLogin(props) {
    // 判断登陆
    const user = sessionStorage.getItem("user");
    // 未登陆重定向到登陆页面
    const pathname = props.location.pathname !== "/login";

    if (!user && pathname) {
      props.history.push("/login");
    }

    return user ? <Component {...props}>{props.children}</Component> : null;
  }

  Component.requireLogin = requireLogin;
  return Component.requireLogin;
}
