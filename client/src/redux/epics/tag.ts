import { getType } from "typesafe-actions";
import { of, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { Api } from "../../utils";
import { Tags } from "@actions";
import moment from "moment";

export const get_tag_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Tags.instance.getTagAll)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/tag/list/all").pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map(item => ({
              ...item,
              createdAt: moment(item.createAt).format("YYYY-MM-DD, h:mm:ss a")
            }));
            return Tags.instance.getTagAllSuccess({
              tag_list_all: data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};
