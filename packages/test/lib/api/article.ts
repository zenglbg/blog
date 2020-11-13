import { api } from "@lib/utils/fetch/api";

export class ArticleApi {
  /**
   * 获取所有文章
   */
  static async getArticles(params: {
    page: number;
    pageSize: number;
    status: string;
    [key: string]: any;
  }): Promise<[IArticle[], number]>  {
    console.log(params);
    return api.get("/article", { params });
  }

  /**
   * 获取分类所有文章
   * @param category
   * @param params
   */
  static async getArticlesByCategory(
    category,
    params
  ): Promise<[IArticle[], number]> {
    return api.get("/article/category/" + category, { params });
  }

  /**
   * 获取标签所有文章
   * @param tag
   * @param params
   */
  static async getArticlesByTag(tag, params): Promise<[IArticle[], number]> {
    return api.get("/article/tag/" + tag, { params });
  }

  /**
   * 获取推荐文章
   * @param articleId
   */
  static async getRecommend(articleId = null): Promise<IArticle[]> {
    return api.get("/article/recommend", { params: { articleId } });
  }

  /**
   * 获取所有文章归档
   */
  static async getArchives(): Promise<{
    [key: string]: { [key: string]: IArticle[] };
  }> {
    return api.get("/article/archives");
  }

  /**
   * 获取指定文章
   * @param id
   */
  static async getArticle(id): Promise<IArticle> {
    return api.get(`/article/${id}`);
  }

  /**
   * 新建文章
   * @param data
   */
  static async addArticle(data): Promise<IArticle> {
    return api.post("/article", data);
  }

  /**
   * 更新文章
   * @param id
   * @param data
   */
  static async updateArticle(id, data): Promise<IArticle> {
    return api.patch(`/article/${id}`, data);
  }

  /**
   * 更新文章阅读量
   * @param id
   * @param data
   */
  static async updateArticleViews(id): Promise<IArticle> {
    return api.post(`/article/${id}/views`);
  }

  /**
   * 校验文章密码是否正确
   * @param id
   * @param password
   */
  static async checkPassword(
    id,
    password
  ): Promise<{ pass: boolean } & IArticle> {
    return api.post(`/article/${id}/checkPassword`, { password });
  }

  /**
   * 删除文章
   * @param id
   */
  static async deleteArticle(id): Promise<IArticle> {
    return api.delete(`/article/${id}`);
  }
}
