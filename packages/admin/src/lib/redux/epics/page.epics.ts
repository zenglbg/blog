import { PageApi } from "@lib/api";
import { ActionPage } from "@redux/actions";
import { ActionsObservable, Epic, ofType } from "redux-observable";
import { getType, PayloadAction } from "typesafe-actions";
import { map, switchMap } from "rxjs/operators";

type IAction = ActionsObservable<PayloadAction<string, IPage>>;

export function getPage(action$: ActionsObservable<any>) {
  return action$.pipe(
    ofType(getType(ActionPage.getpage)),
    switchMap((action) => {
      return PageApi.getPagelist();
    }),
    // tap(console.log),
    map((res) => {
      const [pages, total] = res;
      return ActionPage.setpage({
        pages,
        total,
      });
    })
  );
}

export const addPage = (action$: IAction) => {
  return action$.pipe(
    ofType(getType(ActionPage.addPage)),
    switchMap(({ payload }) => {
      if (payload.id) {
        return PageApi.updatePage(payload.id, payload);
      } else {
        return PageApi.createPage(payload);
      }
    }),
    // tap((res) => {
    //   console.log(res, "after");
    // }),
    map((res) => ActionPage.handleId(res))
  );
};
