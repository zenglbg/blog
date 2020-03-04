import { ofType, Epic, ActionsObservable } from "redux-observable";
import { UserAction, userActions } from "../actions";
import { ajax } from "rxjs/ajax";
import { throwError } from "rxjs";
import { map, switchMap, catchError, take, mapTo, delay } from "rxjs/operators";
import { getType } from "typesafe-actions";
import Router from "next/router";
import { Api } from "../../../utils/api";

export const userEpic: Epic<UserAction, UserAction> = (
  action$: ActionsObservable<any>
) =>
  action$.pipe(
    ofType(getType(userActions.doLogin)),
    switchMap(({ payload }) => {
      return Api.instance
        .post("/api/login", {
          user: payload.userName,
          passwd: payload.password
        })
        .pipe(
          map(res => {
            console.log(res, "res");
            if (res.response.code === 1000) {
              const data = {
                user: res.response.user,
                passwd: res.response.passwd
              };
              Router.push("/admin/home");
              return userActions.loginSuccess(data);
            } else {
              return userActions.loginError(res.response.msg);
            }
          }),
          catchError(err => {
            userActions.loginError("发生了错误");
            return throwError(err);
          })
        );
    })
  );
