import { ajax } from "rxjs/ajax";

interface IParams {
  [p: string]: any;
}

export class Api {
  private static api: Api;
  private defautlHaders: Object = {
    "Content-Type": "application/json; charset=utf-8",
  };
  constructor(header?: Object) {
    this.defautlHaders = Object.assign(this.defautlHaders, header);
  }

  private checkToken() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.defautlHaders["authorization"] = token;
    }
  }

  public get(url: string, params?: IParams) {
    this.checkToken();
    const _params = params
      ? Object.keys(params).reduce((acc, val) => {
          return acc + `${val}=${params[val]}&`;
        }, "")
      : "";
    const _url = url.replace(/\?$/, "") + "?";
    return ajax({
      url: (_url + _params).replace(/\&$/, ""),
      headers: this.defautlHaders,
    });
  }

  public post(url: string, body: IParams) {
    this.checkToken();
    return ajax({
      url: url,
      method: "post",
      body: body,
      headers: this.defautlHaders,
    });
  }

  public static get instance() {
    if (!this.api) {
      this.api = new Api();
    }
    return this.api;
  }
}
