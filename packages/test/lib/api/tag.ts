import { api } from "@lib/utils/fetch/api";

export class TagApi {
  /**
   * 获取所有标签
   */
  static async getTags(params): Promise<ITag[]> {
    return api.get("/tag", { params });
  }

  /**
   * 获取指定标签下文章
   * @param id
   */
  static async getTagWithArticles(id, needFilter = false): Promise<ITag> {
    return api.get(
      `/tag/${id}/article`,
      needFilter
        ? {
            params: { status: "publish" },
          }
        : {}
    );
  }

  /**
   * 添加标签
   * @param data
   */
  static async addTag(data): Promise<ITag> {
    return api.post("/tag", data);
  }

  /**
   * 获取标签
   * @param id
   */
  static async getTagById(id): Promise<ITag> {
    return api.get(`/tag/${id}`);
  }

  /**
   * 更新标签
   * @param id
   * @param data
   */
  static async updateTag(id, data): Promise<ITag> {
    return api.patch(`/tag/${id}`, data);
  }

  /**
   * 删除标签
   * @param id
   */
  static async deleteTag(id): Promise<ITag> {
    return api.delete(`/tag/${id}`);
  }
}
