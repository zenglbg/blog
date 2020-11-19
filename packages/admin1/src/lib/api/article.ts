import { api } from "@/lib/fetch/api";

export class ArticleApi {
  /**
   * 获取所有文章
   */
  static async getArticles(params: {
    page: string | number | string[];
    pageSize: string | number | string[];
    status: string;
    [key: string]: any;
  }): Promise<{ data: IArticle[]; total: number }> {
    return api.get("/article", { params });
  }

  static getLove(): Promise<IArticle[]> {
    return api.get("/article/love");
  }
  /**
   * 获取分类所有文章
   * @param category
   * @param params
   */
  static async getArticlesByCategory(
    category: any,
    params: any
  ): Promise<{ data: IArticle[]; total: number }> {
    return api.get("/article/category/" + category, { params });
  }

  /**
   * 获取标签所有文章
   * @param tag
   * @param params
   */
  static async getArticlesByTag(
    tag: any,
    params: any
  ): Promise<{ data: IArticle[]; total: number }> {
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
  static async getArticle(id: any): Promise<IArticle> {
    return api.get(`/article/${id}`);
  }

  /**
   * 新建文章
   * @param data
   */
  static async addArticle(data: any): Promise<IArticle> {
    return api.post("/article/create", data);
  }

  /**
   * 更新文章
   * @param id
   * @param data
   */
  static async updateArticle(id: any, data: any): Promise<IArticle> {
    return api.patch(`/article/${id}`, data);
  }

  /**
   * 更新文章阅读量
   * @param id
   * @param data
   */
  static async updateArticleViews(id: any): Promise<IArticle> {
    return api.post(`/article/${id}/views`);
  }

  /**
   * 校验文章密码是否正确
   * @param id
   * @param password
   */
  static async checkPassword(
    id: any,
    password: any
  ): Promise<{ pass: boolean } & IArticle> {
    return api.post(`/article/${id}/checkPassword`, { password });
  }

  /**
   * 删除文章
   * @param id
   */
  static async deleteArticle(id: any): Promise<IArticle> {
    return api.delete(`/article/${id}`);
  }
}
