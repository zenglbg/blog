import { Http } from '@utils/fetch/http'

export class Categorysr {
  public static getCategorys() {
    return Http.get('/category', {})
  }
}
