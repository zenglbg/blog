import { getType } from "typesafe-actions";
import { of, throwError } from "rxjs";
import {
  map,
  mapTo,
  switchMap,
  catchError,
  throttleTime,
} from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { message } from "antd";
import { Api } from "@service";
import { Category } from "../actions";
import moment from "moment";
import category from "../reducer/category";

export const get_category_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Category.instance.getCategoryAll)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/category/list/all").pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map((item) => ({
              ...item,
              createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            }));
            return Category.instance.getCategoryAllSuccess({
              category_list_all: data,
            });
          }
        }),
        catchError((err) => throwError(err))
      );
    })
  );
};

export const get_category = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Category.instance.getCategory)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/category/list", payload).pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map((item) => ({
              ...item,
              createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            }));
            return Category.instance.getCategoryAllSuccess({
              category_list_all: data,
            });
          }
        }),
        catchError((err) => throwError(err))
      );
    })
  );
};

export const createCategory = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Category.instance.createCategory)),
    // throttleTime(200),
    switchMap(({ payload }) => {
      /**
       * payload: {name: string|number}
       */
      console.log(payload, "payloadpayloadpayloadpayloadpayload");
      return Api.instance.post("/api/category/create", payload).pipe(
        map((res) => {
          if (res.response.code === 1000) {
            message.success("分类创建成功");
            return Category.instance.getCategoryAll();
          }
          return Category.instance.createCategoryErr(res.response.msg);
        })
      );
    })
  );
};

export const del_category = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Category.instance.delCategory)),
    switchMap(({ payload }) => {
      /**
       * payload : {id: number}
       */
      console.log(payload);
      return Api.instance.post("/api/category/destroy", payload).pipe(
        map((res) => {
          if (res.response.code === 1000) {
            return Category.instance.getCategoryAll();
          }
          message.error(res.response.msg);
          return Category.instance.delCategoryErr(res.response.msg);
        })
      );
    })
  );
