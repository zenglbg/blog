import { ofType, Epic, ActionsObservable } from "redux-observable";
import { User } from "../actions";
import { throwError, of, merge, combineLatest } from "rxjs";
import { map, switchMap, catchError, take, mapTo, delay } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { push } from "connected-react-router";
import { Api } from "../../utils/api";

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.instance.doLogin)),
    switchMap(({ payload }) => {
      return Api.instance
        .post("/api/login", {
          user: payload.userName,
          passwd: payload.password
        })
        .pipe(
          map(res => {
            if (res.response.code === 1000) {
              const data = {
                user: res.response.user,
                passwd: res.response.passwd
              };
              return push("/admin/home");
              return User.instance.loginSuccess(data);
            } else {
              return User.instance.loginError(res.response.msg);
            }
          }),
          catchError(err => {
            User.instance.loginError("发生了错误");
            return throwError(err);
          })
        );
    })
  );
