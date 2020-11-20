import {
  ActionsObservable,
  StateObservable,
  combineEpics,
  Epic,
} from "redux-observable";
import { Action } from "redux";
import { catchError } from "rxjs/operators";

import * as user from "./user.epics";
import * as article from "./article.epics";
import * as page from "./page.epics";
import { IState } from "@reducer";


export const rootEpics: Epic<Action, Action, void, void> = (
  action$,
  store$,
  dependencies
) =>
  combineEpics
    .apply(null, [
      ...Object.values(user),
      ...Object.values(page),
      ...Object.values(article),
    ])(action$, store$, dependencies)
    .pipe(
      catchError((err, source) => {
        console.log(err);
        return source;
      })
    );
