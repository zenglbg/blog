import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";

import * as user from "./user.epics";
import * as article from "./article.epics";
import * as page from "./page.epics";

export const rootEpics = (action$, store$, dependencies) =>
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
