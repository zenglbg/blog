import { createAction, ActionType } from "typesafe-actions";

export type ArticleType = ActionType<typeof Article.instance>;

export class Article {
  public get_article_list: string = "GET_ARTICLE_LIST";
  public get_article_success: string = "GET_ARTICLE_SUCCESS";
  public get_article_error: string = "GET_ARTICLE_ERROR";
  public get_article_status: string = "GET_ARTICLE_STATUS";

  public del_article: string = "DEL_ARTICLE";
  public del_article_success: string = "DEL_ARTICLE_SUCCESS";
  public del_article_error: string = "DEL_ARTICLE_ERROR";

  public create_article: string = "CREATE_ARTICLE";
  public create_article_success: string = "CREATE_ARTICLE_SUCCESS";
  public create_article_error: string = "CREATE_ARTICLE_ERROR";

  public get_article_item = "GET_ARTICLE_ITEM";
  public get_article_item_success = "GET_ARTICLE_ITEM_SUCCESS";
  public get_article_item_error = "GET_ARTICLE_ITEM_ERROR";

  public static article: Article;

  public static get instance() {
    if (!this.article) {
      this.article = new Article();
    }
    return this.article;
  }

  public getArticleList = createAction(
    this.get_article_list,
    (article?: any) => article
  )();
  public getArticleSuccess = createAction(
    this.get_article_success,
    article => article
  )();
  public getArticleError = createAction(
    this.get_article_error,
    article => article
  )();
  public getArticleStatus = createAction(
    this.get_article_status,
    (list_loading: boolean = false) => ({ list_loading })
  )();

  public delArticle = createAction(this.del_article, id => id)();
  public delArticleSuccess = createAction(
    this.del_article_success,
    article => article
  )();
  public delArticleError = createAction(
    this.del_article_error,
    article => article
  )();

  public createArticle = createAction(
    this.create_article,
    (article: { title: string }) => article
  )();
  public createArticleSuccess = createAction(
    this.create_article_success,
    article => article
  )();
  public createArticleError = createAction(
    this.create_article_error,
    article => article
  )();

  public getArticleItem = createAction(
    this.get_article_item,
    (params?: any) => params
  )();
  public getArticleItemSuccess = createAction(
    this.get_article_item_success,
    articleItem => articleItem
  )();
  public getArticleItemError = createAction(
    this.get_article_item_error,
    err => err
  )();
}
