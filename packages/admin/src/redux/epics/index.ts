import { combineEpics } from "redux-observable";
import { catchError, map } from "rxjs/operators";

import * as user from "./user";
import { message } from "antd";

export const rootEpics = (action$, store$, dependencies) =>
  combineEpics
    .apply(null, [...Object.values(user)])(action$, store$, dependencies)
    .pipe(
      catchError((err, source) => {
        if (err && /^validation/g.test(err.message)) {
          const str = err.message.substr("validation,".length);
          message.error(str);
        }
        return source;
      })
    );
