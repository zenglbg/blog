import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Api } from "@service";
import { message } from "antd";

export class SrUser extends Api {
  public static getCode<T, J>(user_name: T, user_email: J): Observable<any> {
    return this.instance.post("/api/code", { user_name, user_email }).pipe(
      map((res) => {
        const { code, msg } = res.response;
        if (code == 200) {
          message.success(msg);
        } else {
          message.error(msg);
        }
        return null;
      })
    );
  }

  public static authCode<T, J, Q>(
    user_name: T,
    user_email: J,
    validate_code: Q
  ): Observable<any> {
    return this.instance
      .post("/api/auth", { user_name, user_email, validate_code })
      .pipe(
        map((res) => {
          const { code, msg } = res.response;

          if (code === 200) {
            message.success(msg);
          } else {
            message.error(msg);
          }
          return res.response.code === 200;
        })
      );
  }

  public static register<T>(body: T): Observable<any> {
    /**
     * 返回true 为注册成功 false 为注册失败。
     * 为true总调用登录
     */
    return this.instance.post("/api/register", body).pipe(
      map((res) => {
        const { code, msg } = res.response;
        if (code === 200) {
          message.success(msg);
        } else {
          message.error(msg);
        }
        return code === 200;
      })
    );
  }

  public static login<T>(body: T): Observable<any> {
    return this.instance.post("/api/login", body);
  }

  public static profiles(): Observable<any> {
    return this.instance.post("/api/getUserInfo");
  }
}
