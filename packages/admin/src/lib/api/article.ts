import { Http } from "@lib/utils/fetch/http";

export class Articlesr {
  public static getArticles(params) {
    return Http.get("/article/", params);
  }

  /**
   *
   * @param id 新建文章
   */
  /**
   * static addArtilce
   */
  public static addArticle(article) {
    return Http.post("/article/create", article);
  }

  /**
   * 更新文章
   * @param id 
   * @param data
   */
  /**
   * static updateArticle
   */
  public static updateArticle(id, article) {
    return Http.patch(`/article/${id}`, article);
  }

  /**
   * deleteArticle
   *
   */
  public static deleteArticle(id) {
    return Http.delete(`/article/${id}`);
  }
}
