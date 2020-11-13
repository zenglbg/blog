import { Http } from "@lib/utils/fetch/http";

export class PageApi {
  static createPage(page) {
    return Http.post("/page", page);
  }

  static updatePage(id, page) {
    return Http.patch(`/page/${id}`, page);
  }

  static getPagelist(data = {}) {
    return Http.get("/page", data);
  }
}
