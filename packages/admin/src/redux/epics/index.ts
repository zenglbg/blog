import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";

import * as user from "./user";

export const rootEpics = (action$, store$, dependencies) =>
  combineEpics
    .apply(null, [...Object.values(user)])(action$, store$, dependencies)
    .pipe(
      catchError((err, source) => {
        console.log(err);
        return source;
      })
    );
