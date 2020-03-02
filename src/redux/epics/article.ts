import { ofType, Epic, ActionsObservable } from "redux-observable";
import { getType } from "typesafe-actions";
import { from, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ArticleAction, articleActions } from "../actions";
import { Api } from "../../utils/api";

export const get_articleEpic: Epic<ArticleAction, ArticleAction> = (
  action$: ActionsObservable<any>
) =>
  action$.pipe(
    ofType(getType(articleActions.getArticleList)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/article/list", payload).pipe(
        map(res => articleActions.getArticleSuccess(res.response)),
        catchError(err => {
          articleActions.getArticleError("发生了错误");
          return throwError(err);
        })
      );
    })
  );

export const del_articleEpic: Epic<ArticleAction, ArticleAction> = (
  action$: ActionsObservable<any>
) =>
  action$.pipe(
    ofType(getType(articleActions.delArticle)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/article/destroy", payload).pipe(
        map(res => {
          return articleActions.delArticleSuccess(res);
        }),
        catchError(error => {
          articleActions.delArticleError(error);
          return throwError(error);
        })
      );
    })
  );
