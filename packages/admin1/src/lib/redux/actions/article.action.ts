import { createAction } from "typesafe-actions";

export class ActionArticle {
  /**请求文章 */
  public static getArticles = createAction(
    "GET_ARTICLES",
    (params) => params
  )();

  /**
   * 获取文章数据
   */
  public static setArticles = createAction("SET_ARTICLES", (data) => data)();

  /**
   * 被选中的文章
   */
  public static handleId = createAction("HANDLE_ID", (onId) => ({ onId }))();
}
