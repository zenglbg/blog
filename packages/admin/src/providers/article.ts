import { Http } from '../utils'

export class Articlesr {
  public static getArticles(params) {
    return Http.get('/article', params)
  }

  /**
   * deleteArticle
   *
   */
  public static deleteArticle(id) {
    return Http.delete(`/article/${id}`)
  }
}
