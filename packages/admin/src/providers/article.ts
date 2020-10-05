import { Http } from "@utils/fetch/http";

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
  public static addArtilce(data) {
    return Http.post("/article/create", data);
  }

  /**
   * 更新文章
   * @param id 
   * @param data
   */
  /**
   * static updateArticle
   */
  public static updateArticle(id, data) {
    return Http.patch(`/article/${id}`, data);
    
  }

  /**
   * deleteArticle
   *
   */
  public static deleteArticle(id) {
    return Http.delete(`/article/${id}`);
  }
}
