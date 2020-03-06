import { ofType, Epic, ActionsObservable } from "redux-observable";
import { getType } from "typesafe-actions";
import { from, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { Article } from "../actions";
import { Api } from "../../utils/api";

export const get_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.getArticleList)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/article/list", payload).pipe(
        map(res => {
          return Article.instance.getArticleSuccess(res.response);
        }),
        catchError(err => {
          Article.instance.getArticleError("发生了错误");
          return throwError(err);
        })
      );
    })
  );

export const del_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.delArticle)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/article/destroy", payload).pipe(
        map(res => {
          return Article.instance.delArticleSuccess(res);
        }),
        map(del => {
          return Article.instance.getArticleList();
        }),
        catchError(err => {
          Article.instance.delArticleError(err);
          return throwError(err);
        })
      );
    })
  );

export const create_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.createArticle)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/article/create", payload).pipe(
        map(res => {
          return Article.instance.createArticleSuccess(res);
        }),
        catchError(err => {
          Article.instance.createArticleError(err);
          return throwError(err);
        })
      );
    })
  );
