import { createAction, ActionType } from "typesafe-actions";
import { Article } from "../constants";

export type ArticleAction = ActionType<typeof articleActions>;

export namespace articleActions {
  export const getArticleList = createAction(
    Article.get_article_list,
    article => article
  )();
  export const getArticleSuccess = createAction(
    Article.get_article_success,
    article => article
  )();
  export const getArticleError = createAction(
    Article.get_article_error,
    article => article
  )();

  export const delArticle = createAction(
    Article.del_article,
    article => article
  )();
  export const delArticleSuccess = createAction(
    Article.del_article_success,
    article => article
  )();
  export const delArticleError = createAction(
    Article.del_article_error,
    article => article
  )();
}
