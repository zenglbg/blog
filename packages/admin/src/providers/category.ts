import { Http } from '@utils/index'

export class Categorysr {
  public static getCategorys() {
    return Http.get('/category', {})
  }
}
