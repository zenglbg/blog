import { api } from '@lib/utils/fetch/api';

export class CommentApi {
  /**
   * 获取所有评论
   */
  static async getComments(params): Promise<[IComment[], number]> {
    return api.get("/comment", { params });
  }

  /**
   * 获取指定评论
   * @param id
   */
  static async getComment(id): Promise<IComment> {
    return api.get(`/comment/${id}`);
  }

  /**
   * 获取指定文章评论
   * @param hostId
   */
  static async getArticleComments(
    hostId,
    params
  ): Promise<[IComment[], number]> {
    return api.get(`/comment/host/${hostId}`, { params });
  }

  /**
   * 添加评论
   * @param data
   */
  static async addComment(data): Promise<IComment> {
    return api.post("/comment", data);
  }

  /**
   * 更新评论
   * @param id
   * @param data
   */
  static async updateComment(id, data): Promise<IComment> {
    return api.patch(`/comment/${id}`, data);
  }

  /**
   * 删除评论
   * @param id
   */
  static async deleteComment(id): Promise<IComment> {
    return api.delete(`/comment/${id}`);
  }
}
