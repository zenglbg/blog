import { getType } from "typesafe-actions";
import { of, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ofType, ActionsObservable } from "redux-observable";
import { message } from "antd";
import { Api } from "../../utils";
import { Tags } from "@actions";
import moment from "moment";

export const get_tag_all = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Tags.instance.getTagAll)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/tag/list/all").pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map(item => ({
              ...item,
              createdAt: moment(item.createAt).format("YYYY-MM-DD, h:mm:ss a")
            }));
            return Tags.instance.getTagAllSuccess({
              tag_list_all: data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};

export const get_tag = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Tags.instance.getTag)),
    switchMap(({ payload }) => {
      return Api.instance.get("/api/tag/list", payload).pipe(
        map((res: any) => {
          if (res.response.code === 1000) {
            const data = res.response.data.map(item => ({
              ...item,
              createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
            }));
            return Tags.instance.getTagAllSuccess({
              tag_list_all: data
            });
          }
        }),
        catchError(err => throwError(err))
      );
    })
  );
};

export const createTag = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(Tags.instance.createTag)),
    // throttleTime(200),
    switchMap(({ payload }) => {
      /**
       * payload: {name: string|number}
       */
      console.log(payload, "payloadpayloadpayloadpayloadpayload");
      return Api.instance.post("/api/tag/create", payload).pipe(
        map(res => {
          if (res.response.code === 1000) {
            message.success("分类创建成功");
            return Tags.instance.getTagAll();
          }
          return Tags.instance.createTagErr(res.response.msg);
        })
      );
    })
  );
};

export const del_tag = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(getType(Tags.instance.delTag)),
    switchMap(({ payload }) => {
      /**
       * payload : {id: number}
       */
      console.log(payload);
      return Api.instance.post("/api/tag/destroy", payload).pipe(
        map(res => {
          if (res.response.code === 1000) {
            return Tags.instance.getTagAll();
          }
          message.error(res.response.msg);
          return Tags.instance.delTagErr(res.response.msg);
        })
      );
    })
  );
