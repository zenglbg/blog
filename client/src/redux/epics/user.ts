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
  concatAll
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

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.instance.doLogin)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/login", {
        user: payload.userName,
        passwd: payload.password
      });
    }),
    mergeMap(res => {
      console.log(res, "res");
      if (res.response.code === 1000) {
        const data = {
          user: res.response.user,
          passwd: res.response.passwd
        };
        return concat(
          of(User.instance.loginSuccess(data)),
          of(push("/admin/home"))
        );
      } else {
        return of(User.instance.loginError(res.response.msg));
      }
    }),
    catchError(err => {
      User.instance.loginError("发生了错误");
      return throwError(err);
    })
  );
