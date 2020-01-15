import { ofType, Epic, ActionsObservable } from "redux-observable";
import { UserState } from "../reducer";
import { UserAction, userActions } from "../actions";
import { ajax } from "rxjs/ajax";
import { throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { getType } from "typesafe-actions"; 

export const userEpic: Epic<UserAction, UserAction> = (
         actions: ActionsObservable<any>
       ) =>
         actions.pipe(
           ofType(getType(userActions.doLogin)),
           switchMap(() => {
             return ajax.getJSON("/api/login").pipe(
               map(
                 res => userActions.doLogin(res),
                 catchError(err => throwError(err))
               )
             );
           })
         );

