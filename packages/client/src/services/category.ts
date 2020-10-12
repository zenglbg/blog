import { api } from '@/utils/fetch/api';

export class CategoryApi {
  /**
   * 获取所有标签
   */
  static async getCategory(params): Promise<ICategory[]> {
    return api.get('/category', { params });
  }

  /**
   * 添加标签
   * @param data
   */
  static async add(data): Promise<ICategory> {
    return api.post('/category', data);
  }

  /**
   * 获取分类
   * @param id
   */
  static async getCategoryById(id): Promise<ICategory> {
    return api.get(`/category/${id}`);
  }

  /**
   * 更新标签
   * @param id
   * @param data
   */
  static async update(id, data): Promise<ICategory> {
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
