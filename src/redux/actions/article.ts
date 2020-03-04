import { createAction, ActionType } from "typesafe-actions";
import { Article } from "../constants";

export type ArticleAction = ActionType<typeof articleActions>;

export namespace articleActions {
  export const getArticleList = createAction(
    Article.get_article_list,
    (article?: any) => article
  )();
  export const getArticleSuccess = createAction(
    Article.get_article_success,
    article => article
  )();
  export const getArticleError = createAction(
    Article.get_article_error,
    article => article
  )();
  export const getArticleStatus = createAction(
    Article.get_article_status,
    (list_loading: boolean = false) => ({ list_loading })
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

  export const createArticle = createAction(
    Article.create_article,
    (article: { title: string }) => article
  )();
  export const createArticleSuccess = createAction(
    Article.create_article_success,
    article => article
  )();
  export const createArticleError = createAction(
    Article.create_article_error,
    article => article
  )();
}
