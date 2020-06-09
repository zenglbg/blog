import { InterceptorManager } from "./InterceptorManager";

export interface RequestConfig extends RequestInit {}

export class Z {
  interceptors: {
    request: InterceptorManager;
    response: InterceptorManager;
  };

  constructor(public defualts: RequestConfig) {
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  request(config) {
    if (typeof config === "string") {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }
  }
}
