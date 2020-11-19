import { ActionsObservable, ofType } from "redux-observable";
import { getType } from "typesafe-actions";
import { forkJoin, of } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { ActionArticle } from "@actions";
import { ArticleApi } from "@api";

export const getArticleEpics = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(ActionArticle.getArticles)),
    switchMap(({ payload }) => {
      return forkJoin([ArticleApi.getArticles(payload), of(payload)]);
    }),
    tap(console.log),
    map(([res, params]) => {
      const { total, data } = res;
      return ActionArticle.setArticles({
        total,
        articles: data,
        params,
      });
    })
  );
};
