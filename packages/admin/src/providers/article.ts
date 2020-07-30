import { Http } from '../utils'

export class Articlesr {
  public static getArticles(params) {
    return Http.get('/article', params)
  }
}
