import { Http } from '@utils/index'

export class Tagssr {
  public static getTags() {
    return Http.get('/tag', {})
  }
}
