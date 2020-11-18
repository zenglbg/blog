 
import { api } from '@lib/utils/fetch/api';

export class MailApi {
  /**
   * 获取所有邮件
   */
  static async getMails(params): Promise<[IMail[], number]> {
    return api.get("/smtp", { params });
  }

  static async deleteMail(id): Promise<IMail> {
    return api.delete("/smtp/" + id);
  }
}
