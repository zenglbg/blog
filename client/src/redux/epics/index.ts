import { combineEpics } from "redux-observable";
import { catchError } from "rxjs/operators";
import { userEpic } from "./user";
import { get_articleEpic, del_articleEpic } from "./article";

export const rootEpics = (action$, store$, dependencies) =>
  combineEpics(userEpic, get_articleEpic, del_articleEpic)(
    action$,
    store$,
    dependencies
  ).pipe(
    catchError((err, source) => {
      console.log(err);
      return source;
    })
  );
