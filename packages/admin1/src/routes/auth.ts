import React, { useState, useEffect } from "react";
import { UserApi } from "@api";

export enum LoginStatus {
  init, //
  logged, //已登陆
  notLogged, //未登录
}

export function useLoginStatusInit() {
  useEffect(() => {
    UserApi.getUsers();
  }, []);
}
