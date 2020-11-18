import { ofType, Epic, ActionsObservable } from "redux-observable";
import { of, merge, concat, combineLatest } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { push } from "connected-react-router";

import { UserApi } from "@lib/api";
import { ActionUser } from "@lib/redux/actions/index";

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(ActionUser.doLogin)),
    switchMap(({ payload }) => {
      return UserApi.login(payload);
    }),
    map((res) => {
      return concat(of(ActionUser.loginS(res)), of(push("/admin/home")));
    })
  );

export const register = (action$: ActionsObservable<any>, state$) =>
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

// export const profiles = (action$: ActionsObservable<any>) =>
//   action$.pipe(
//     ofType(getType(ActionUser.instance.profiles)),
//     switchMap(({ payload }) => {
//       return SrActionUser.profiles().pipe(
//         map(({ response }) => {
//           return ActionUser.instance.profiles0(response);
//         })
//       );
//     })
//   );
