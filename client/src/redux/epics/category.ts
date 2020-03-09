import { getType } from "typesafe-actions";
import { of, throwError } from "rxjs";
import { map, mapTo, switchMap, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { Api } from "../../utils";
import { Category } from "../actions";

export const get_category_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Category.instance.getCategoryAll)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/category/list/all").pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            return Category.instance.getCategoryAllSuccess({
              category_list_all: res.response.data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};
