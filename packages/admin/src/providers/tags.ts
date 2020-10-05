import { Http } from '@utils/fetch/http'

export class Tagssr {
  public static getTags() {
    return Http.get('/tag', {})
  }
}
