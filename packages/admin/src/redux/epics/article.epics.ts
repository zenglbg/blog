import { ActionsObservable, ofType } from "redux-observable";
import { getType } from "typesafe-actions";
import { switchMap, map } from "rxjs/operators";
import { ActionArticle } from "@actions/index";
import { Articlesr } from "@providers/index";

export const getArticleEpics = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(getType(ActionArticle.getArticles)),
    switchMap(({ payload }) => {
      return Articlesr.getArticles(payload).pipe(
        map(({ success, data }) => {
          if (success) {
           
            return ActionArticle.setArticles({
              total: data.total,
              articles: data.data,
              params: payload,
            });

            //  concat(of(ActionUser.loginS(data)), of(push('/admin/home')))
          } else {
            throw new Error("登陆失败");
          }
        })
      );
    })
  );
};
