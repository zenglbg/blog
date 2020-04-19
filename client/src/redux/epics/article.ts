import { ofType, Epic, ActionsObservable } from "redux-observable";
import { getType, action } from "typesafe-actions";
import { push } from "connected-react-router";
import { throwError, of, concat, merge } from "rxjs";
import {
  map,
  switchMap,
  catchError,
  mapTo,
  distinctUntilChanged,
  combineLatest,
  takeLast,
  mergeMap,
  concatAll,
} from "rxjs/operators";
import moment from "moment";
import { IState } from "@reducer";
import { Article } from "@actions";
import { Api } from "@service";

export const get_article_all = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.getArticleListAll)),
    switchMap(() =>
      Api.instance.get("/api/article1/list/all").pipe(
        map((res) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map((item: any) => {
              // console.log(item);
              return {
                ...item,
                createdAt: moment(item.createdAt).format("YYYY-MM-DD, h:mm:ss"),
                updatedAt: moment(item.updatedAt).format("YYYY-MM-DD, h:mm:ss"),
              };
            });
            return Article.instance.getArticleListAllSuccess(data);
          }
          return Article.instance.getArticleError(res.response.msg);
        })
      )
    )
  );

export const get_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.getArticleList)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/article/list", payload).pipe(
        map((res) => {
          if (res.response.code === 200) {
            const data = res.response.data.map((item: any) => {
              return {
                ...item,
                createdAt: moment(item.createdAt).format("YYYY-MM-DD, h:mm:ss"),
                updatedAt: moment(item.updatedAt).format("YYYY-MM-DD, h:mm:ss"),
              };
            });
            return Article.instance.getArticleSuccess(data);
          } else {
            return Article.instance.getArticleError(res.response.msg);
          }
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    })
  );

export const del_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.delArticle)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/article1/destroy", payload).pipe(
        map((res) => {
          return Article.instance.delArticleSuccess(res);
        }),
        map((del) => {
          return Article.instance.getArticleList();
        }),
        catchError((err) => {
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
      return Api.instance.post("/api/article1/create", payload).pipe(
        map((res) => {
          return Article.instance.createArticleSuccess(res);
        }),
        catchError((err) => {
          Article.instance.createArticleError(err);
          return throwError(err);
        })
      );
    })
  );
export const upadte_articleEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Article.instance.updateArticle)),
    switchMap(({ payload }) => {
      return Api.instance.post("/api/article1/update", payload).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }),
    map((res) => {
      if (res.response.code === 1000) {
        return concat(
          of(Article.instance.createArticleSuccess(res)),
          of(push("/admin/article"))
        );
      } else {
        return of(Article.instance.createArticleError(res.response.msg));
      }
    }),
    concatAll()
  );

export const get_articleItem = (action$: ActionsObservable<any>, state$) => {
  // const params$ = state$.pipe(
  //   map(({ router }: IState) => {
  //     return router.location.state;
  //   }),
  //   distinctUntilChanged()
  // );

  return action$.pipe(
    ofType(getType(Article.instance.getArticleItem)),
    // combineLatest(params$, (action, params) => params),
    switchMap(({ payload, ...aaa }) => {
      // console.log(payload, aaa, "payloadpayloadpayloadpayload");
      return Api.instance
        .get("/api/article1/item", payload)
        .pipe(map((res) => res));
    }),
    mergeMap((res: any) => {
      if (res.response.code === 1000) {
        const data = res.response.data;
        data.createdAt = moment(data.createdAt).format("YYYY-MM-DD, h:mm:ss");
        data.updatedAt = moment(data.createdAt).format("YYYY-MM-DD, h:mm:ss");
        return merge(
          of(
            Article.instance.getArticleItemSuccess({
              article_item: data,
            })
          ),
          of(push("/admin/article-add"))
        );
      }
      return of(Article.instance.getArticleItemError(res.response.msg));
    })
  );
};

export const get_article = (action$: ActionsObservable<any>, state$) => {
  return action$.pipe(
    ofType(getType(Article.instance.getArticle)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/article1/item", payload).pipe(
        map((res) => {
          if (res.response.code === 1000) {
            const data = res.response.data;
            data.createdAt = moment(data.createdAt).format(
              "YYYY-MM-DD, h:mm:ss"
            );
            data.updatedAt = moment(data.createdAt).format(
              "YYYY-MM-DD, h:mm:ss"
            );
            return Article.instance.getArticleItemSuccess({
              article_item: data,
            });
          }
          Article.instance.getArticleItemError(res.response.msg);
        })
      );
    })
  );
};
