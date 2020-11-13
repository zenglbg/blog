import { api } from "@lib/utils/fetch/api";

export class CategoryApi {
  /**
   * 获取所有标签
   */
  static async getCategory(params): Promise<[IArticle[], number]> {
    return api.get("/category", { params });
  }

  /**
   * 添加标签
   * @param data
   */
  static async add(data) {
    return api.post("/category", data);
  }

  /**
   * 获取分类
   * @param id
   */
  static async getCategoryById(id) {
    return api.get(`/category/${id}`);
  }

  /**
   * 更新标签
   * @param id
   * @param data
   */
  static async update(id, data) {
    return api.patch(`/category/${id}`, data);
  }

  /**
   * 删除标签
   * @param id
   */
  static async delete(id): Promise<ICategory> {
    return api.delete(`/category/${id}`);
  }
}
