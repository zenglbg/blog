import { ofType, ActionsObservable } from "redux-observable";
import { of, concat } from "rxjs";
import { map, switchMap, concatMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { push } from "connected-react-router";

import { UserApi } from "@api";
import { ActionUser } from "@actions";

export const userEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(ActionUser.doLogin)),
    switchMap(({ payload }) => {
      return UserApi.login(payload);
    }),
    concatMap((res) => {
      return concat(of(ActionUser.loginS(res)), of(push("/admin/home")));
    })
  );

export const register = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(ActionUser.register)),
    switchMap(({ payload }) => {
      return UserApi.register(payload);
    }),
    map((res) => {
      if (res) {
        return push("/login");
        // return ActionUser.doLogin({ user_name, user_password });
      } else {
        return { type: "err", msg: "注册失败！" };
      }
    })
  );
