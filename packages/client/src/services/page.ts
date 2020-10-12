 
import { api } from '@/utils/fetch/api';

export class PageApi {
  /**
   * 获取所有页面
   */
  static async getPages(params): Promise<[IPage[], number]> {
    return api.get("/page", { params: params });
  }

  /**
   * 获取所有已发布页面
   */
  static async getAllPublisedPages(): Promise<[IPage[], number]> {
    return api.get("/page", { params: { status: "publish" } });
  }

  /**
   * 获取指定页面
   * @param id
   */
  static async getPage(id): Promise<IPage> {
    return api.get(`/page/${id}`);
  }

  /**
   * 新建页面
   * @param data
   */
  static async addPage(data): Promise<IPage> {
    return api.post("/page", data);
  }

  /**
   * 更新页面
   * @param id
   * @param data
   */
  static async updatePage(id, data): Promise<IPage> {
    return api.patch(`/page/${id}`, data);
  }

  /**
   * 更新文章阅读量
   * @param id
   * @param data
   */
  static async updatePageViews(id): Promise<IPage> {
    return api.post(`/page/${id}/views`);
  }

  /**
   * 删除页面
   * @param id
   */
  static async deletePage(id): Promise<IPage> {
    return api.delete(`/page/${id}`);
  }
}
