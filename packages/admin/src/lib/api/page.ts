import { api } from "@lib/utils/fetch/api";

export class PageApi {
  static createPage(page): Promise<IPage> {
    return api.post("/page", page);
  }

  static updatePage(id, page): Promise<IPage> {
    return api.patch(`/page/${id}`, page);
  }

  static delPage(id): Promise<IPage> {
    return api.delete(`/page/${id}`);
  }

  /**
   * 获取指定页面
   * @param id
   */
  static async getPage(id): Promise<IPage> {
    return api.get(`/page/${id}`);
  }

  static getPagelist(params = {}): Promise<[IPage[], number]> {
    return api.get("/page", params);
  }
}
