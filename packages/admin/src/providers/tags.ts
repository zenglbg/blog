import { Http } from '@utils/fetch/http'

export class Tagssr {

  public static addTag(tag) {
    return Http.post("/tag", tag);
  }

  public static delTag(id) {
    return Http.delete(`/tag/${id}`);
  }

  public static updateTag(id, tag) {
    return Http.patch(`/tag/${id}`, tag);
  }

  public static getTags(data={}) {
    return Http.get("/tag", data);
  }
}