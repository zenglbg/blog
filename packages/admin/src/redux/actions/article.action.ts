import { createAction } from "typesafe-actions";

export class ActionArticle {
  public static SET_ARTICLES = "SET_ARTICLES";
  public static GET_ARTICLES = "GET_ARTICLES";
  public static ON_ARTICLE = "ON_ARTICLE";


  /**请求文章 */
  public static getArticles = createAction(
    ActionArticle.GET_ARTICLES,
    (params) => params
  )();


  /**
   * 获取文章数据
   */
  public static setArticles = createAction(
    ActionArticle.SET_ARTICLES,
    (data) => data
  )();

  /**
   * 被选中的文章
   */
  public static onArticle = createAction(
    ActionArticle.ON_ARTICLE,
    (data) => data
  )();
}
