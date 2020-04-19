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
  concatMap,
} from "rxjs/operators";
import { message } from "antd";
import { getType } from "typesafe-actions";
import { push } from "connected-react-router";
import { Api, SrUser } from "@service";

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.instance.doLogin)),
    switchMap(({ payload }) => {
      return SrUser.login(payload).pipe(
        concatMap(({ response }) => {
          const { code, token, user_name, msg } = response;
          if (code == 200) {
            return concat(
              of(User.instance.loginSuccess({ token, user_name })),
              of(push("/admin/home"))
            );
          } else {
            return of(User.instance.loginError(msg));
          }
        })
      );
    }),
    catchError((err) => {
      User.instance.loginError("发生了错误");
      return throwError(err);
    })
  );

export const register = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.instance.register)),
    switchMap(({ payload }) => {
      return SrUser.register(payload).pipe(
        map((res) => {
          const { user_name, user_password } = payload;
          if (res) {
            return User.instance.doLogin({ user_name, user_password });
          } else {
            return { type: "err", msg: "注册失败！" };
          }
        })
      );
    })
  );

export const profiles = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(User.instance.profiles)),
    switchMap(({ payload }) => {
      return SrUser.profiles().pipe(
        map(({ response }) => {
          return User.instance.profiles0(response);
        })
      );
    })
  );
