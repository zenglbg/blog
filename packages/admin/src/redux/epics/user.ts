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

import { Usersr } from '@providers/user'
import { User } from '@actions/user'

export const userEpic = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.doLogin)),
    switchMap(({ payload }) => {
      return Usersr.login(payload).pipe(
        switchMap(({ success, data }) => {
          if (success) {
            return concat(of(User.loginS(data)), of(push('/admin/home')))
          } else {
            throw new Error('登陆失败')
          }
        })
      )
    })
  )

export const register = (action$: ActionsObservable<any>, state$) =>
  action$.pipe(
    ofType(getType(User.register)),
    switchMap(({ payload }) => {
      return Usersr.register(payload).pipe(
        map((res) => {
          if (res.success) {
            return push('/login')
            // return User.doLogin({ user_name, user_password });
          } else {
            return { type: 'err', msg: '注册失败！' }
          }
        })
      )
    })
  )

// export const profiles = (action$: ActionsObservable<any>) =>
//   action$.pipe(
//     ofType(getType(User.instance.profiles)),
//     switchMap(({ payload }) => {
//       return SrUser.profiles().pipe(
//         map(({ response }) => {
//           return User.instance.profiles0(response);
//         })
//       );
//     })
//   );
