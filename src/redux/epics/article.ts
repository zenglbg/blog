import { ofType, Epic, ActionsObservable } from "redux-observable";
import { getType } from "typesafe-actions";
import { from, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ArticleAction, articleActions } from "../actions";
import { Api } from "../../utils/api";
export const articleEpic: Epic<ArticleAction> = (
  action$: ActionsObservable<any>
) =>
  action$.pipe(
    ofType(getType(articleActions.getArticleList)),
    switchMap(({ payload }) => {
      console.log("payload", payload);
      return Api.get("/api/article/list", payload).pipe(
        map(res => articleActions.getArticleSuccess(res.response)),
        catchError(err => {
          articleActions.getArticleError("发生了错误");
          return throwError(err);
        })
      );
    })
  );
