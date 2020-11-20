import { api } from "../fetch";

export default {
  createPage(page: IPage): Promise<IPage> {
    return api.post("/page", page);
  },

  updatePage(id: string | number, page: IPage): Promise<IPage> {
    return api.patch(`/page/${id}`, page);
  },

  delPage(id: string | number): Promise<IPage> {
    return api.delete(`/page/${id}`);
  },

  /**
   * 获取指定页面
   * @param id
   */
  getPage(id: string | number): Promise<IPage> {
    return api.get(`/page/${id}`);
  },

  getPagelist(params = {}): Promise<[IPage[], number]> {
    return api.get("/page", params);
  },
};
