import { ofType, Epic, ActionsObservable } from "redux-observable";
import { getType, action } from "typesafe-actions";
import { from, throwError, of } from "rxjs";
import {
  map,
  switchMap,
  catchError,
  mapTo,
  distinctUntilChanged,
  combineLatest,
  takeLast
} from "rxjs/operators";
import moment from "moment";
import { IState } from "@reducer";
import { Article } from "../actions";
import { Api } from "../../utils/api";

export const get_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.getArticleList)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/article/list", payload).pipe(
        map(res => {
          if (res.response.code === 1000) {
            const data = res.response.data.map((item: any) => {
              return {
                ...item,
                createdAt: moment(item.createdAt).format("YYYY-MM-DD, h:mm:ss"),
                updatedAt: moment(item.updatedAt).format("YYYY-MM-DD, h:mm:ss")
              };
            });
            return Article.instance.getArticleSuccess(data);
          }
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

export const get_articleItem = (action$: ActionsObservable<any>, state$) => {
  const params$ = state$.pipe(
    map(({ router }: IState) => {
      return router.location.state;
    }),
    distinctUntilChanged()
  );

  return action$.pipe(
    ofType(getType(Article.instance.getArticleItem)),
    combineLatest(params$, (action, params) => params),
    switchMap((params: any) => {
      if (params) {
        return Api.instance.get("/api/article/item", params).pipe(
          map((res: any) => {
            if (res.response.code === 1000) {
              return Article.instance.getArticleItemSuccess({
                article_item: res.response.data
              });
            }
            return Article.instance.getArticleItemError(res.response.msg);
          })
        );
      } else {
        return of(Article.instance.getArticleItemError(""));
      }
    })
  );
};
