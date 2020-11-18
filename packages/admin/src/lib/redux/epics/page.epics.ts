import { PageApi } from "@lib/api";
import { ActionPage } from "@redux/actions";
import { ActionsObservable, ofType } from "redux-observable";
import { getType } from "typesafe-actions";
import { map, switchMap, tap } from "rxjs/operators";

export function getPage(action$: ActionsObservable<any>) {
  return action$.pipe(
    ofType(getType(ActionPage.getpage)),
    switchMap((action) => {
      return PageApi.getPagelist();
    }),
    tap(console.log),
    map((res) => {
      if (res.success) {
        const [pages, total] = res.data;
        return ActionPage.setpage({
          pages,
          total,
        });
      }
    })
  );
}
