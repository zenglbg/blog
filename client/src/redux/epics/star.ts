import { getType } from "typesafe-actions";
import { of, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { message } from "antd";
import { Api } from "../../utils";
import { Star } from "@actions";
import moment from "moment";

export const get_star_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Star.instance.getStarAll)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/star/list/all").pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map(item => ({
              ...item,
              createdAt: moment(item.createAt).format("YYYY-MM-DD, h:mm:ss a")
            }));
            return Star.instance.getStarAllSuccess({
              star_list_all: data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};

export const get_star = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Star.instance.getStar)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/star/list", payload).pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map(item => ({
              ...item,
              createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
            }));
            return Star.instance.getStarAllSuccess({
              star_list_all: data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};

export const createStar = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Star.instance.createStar)),
    // throttleTime(200),
    switchMap(({ payload }) => {
      /**
       * payload: {name: string|number}
       */
      console.log(payload, "payloadpayloadpayloadpayloadpayload");
      return Api.instance.post("/api/star/create", payload).pipe(
        map(res => {
          if (res.response.code === 1000) {
            message.success("收藏创建成功");
            return Star.instance.getStarAll();
          }
          return Star.instance.createStarErr(res.response.msg);
        })
      );
    })
  );
};

export const del_star = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Star.instance.delStar)),
    switchMap(({ payload }) => {
      /**
       * payload : {id: number}
       */
      console.log(payload);
      return Api.instance.post("/api/star/destroy", payload).pipe(
        map(res => {
          if (res.response.code === 1000) {
            return Star.instance.getStarAll();
          }
          message.error(res.response.msg);
          return Star.instance.delStarErr(res.response.msg);
        })
      );
    })
  );
