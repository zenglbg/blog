import { ofType, Epic, ActionsObservable } from "redux-observable";
import { User } from "../actions";
import { interval, concat } from "rxjs";
import { throwError, of, merge, combineLatest } from "rxjs";
import {
  map,
  switchMap,
  catchError,
  take,
  mapTo,
  delay,
  startWith,
  mergeMap,
  concatAll,
} from "rxjs/operators";
import { getType } from "typesafe-actions";
import { push } from "connected-react-router";
import { Api } from "../../utils/api";

export const userEpic1 = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.instance.doLogin)),
    switchMap(({ payload }) => {
      return Api.instance
        .post("/api/login", {
          user_name: payload.userName,
          user_password: payload.password,
        })
        .pipe(
          map((res) => {
            if (res.response.code === 200) {
              const data = {
                user: res.response.user,
                passwd: res.response.passwd,
              };
              return concat(
                of(push("/admin/home")),
                of(User.instance.loginSuccess(data))
              );
            } else {
              return of(User.instance.loginError(res.response.msg));
            }
          }),
          catchError((err) => {
            User.instance.loginError("发生了错误");
            return throwError(err);
          })
        );
    }),
    concatAll()
  );

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.instance.doLogin)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/login", {
        user_name: payload.userName,
        user_password: payload.password,
      });
    }),
    mergeMap((res) => {
      console.log(res, "res");
      if (res.response.code === 200) {
        const { token, user_name } = res.response;

        return concat(
          of(User.instance.loginSuccess({ token, user_name })),
          of(push("/admin/home"))
        );
      } else {
        return of(User.instance.loginError(res.response.msg));
      }
    }),
    catchError((err) => {
      User.instance.loginError("发生了错误");
      return throwError(err);
    })
  );
