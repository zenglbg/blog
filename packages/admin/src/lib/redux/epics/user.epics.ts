import { ofType, Epic, ActionsObservable } from 'redux-observable'
import { interval, concat } from 'rxjs'
import { throwError, of, merge, combineLatest } from 'rxjs'
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
} from 'rxjs/operators'
import { message } from 'antd'
import { getType } from 'typesafe-actions'
import { push } from 'connected-react-router'

import { Usersr } from '@lib/api'
import { ActionUser } from '@lib/redux/actions/index'

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(ActionUser.doLogin)),
    switchMap(({ payload }) => {
      return Usersr.login(payload).pipe(
        switchMap(({ success, data }) => {
          if (success) {
            return concat(of(ActionUser.loginS(data)), of(push('/admin/home')))
          } else {
            throw new Error('登陆失败')
          }
        })
      )
    })
  )

export const register = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(ActionUser.register)),
    switchMap(({ payload }) => {
      return Usersr.register(payload).pipe(
        map((res) => {
          if (res.success) {
            return push('/login')
            // return ActionUser.doLogin({ user_name, user_password });
          } else {
            return { type: 'err', msg: '注册失败！' }
          }
        })
      )
    })
  )

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