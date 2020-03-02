import { ajax } from "rxjs/ajax";

interface IParams {
  [p: string]: any;
}

// export namespace Api {
//   export function get(url: string, params: IParams) {
//     const _params = Object.keys(params).reduce((acc, val) => {
//       return acc + `${val}=${params[val]}&`;
//     }, "");
//     const _url = url.replace(/\?$/, "") + "?";
//     return ajax({
//       url: (_url + _params).replace(/\&$/, ""),
//       headers: {
//         "Content-Type": "application/json; charset=utf-8"
//       }
//     });
//   }

//   export function post(url: string, body: IParams) {
//     return ajax({
//       url: url,
//       method: "post",
//       body: body
//     });
//   }
// }

export class Api {
  private static api: Api;

  public get(url: string, params: IParams) {
    const _params = Object.keys(params).reduce((acc, val) => {
      return acc + `${val}=${params[val]}&`;
    }, "");
    const _url = url.replace(/\?$/, "") + "?";
    return ajax({
      url: (_url + _params).replace(/\&$/, ""),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  }

  public post(url: string, body: IParams) {
    return ajax({
      url: url,
      method: "post",
      body: body
    });
  }

  public static get instance() {
    if (!this.api) {
      this.api = new Api();
    }
    return this.api;
  }
}
