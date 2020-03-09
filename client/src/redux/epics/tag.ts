import { getType } from "typesafe-actions";
import { of, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { Api } from "../../utils";
import { Tag } from "../actions";

export const get_tag_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Tag.instance.getTagAll)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/tag/list/all").pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            return Tag.instance.getTagAllSuccess({
              tag_list_all: res.response.data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};
