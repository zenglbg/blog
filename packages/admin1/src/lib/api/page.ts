import { api } from "@/lib/fetch/api";

export class PageApi {
  static createPage(page: IPage): Promise<IPage> {
    return api.post("/page", page);
  }

  static updatePage(id: string | number, page: IPage): Promise<IPage> {
    return api.patch(`/page/${id}`, page);
  }

  static delPage(id: string | number): Promise<IPage> {
    return api.delete(`/page/${id}`);
  }

  /**
   * 获取指定页面
   * @param id
   */
  static async getPage(id: string | number): Promise<IPage> {
    return api.get(`/page/${id}`);
  }

  static getPagelist(params = {}): Promise<[IPage[], number]> {
    return api.get("/page", params);
  }
}
