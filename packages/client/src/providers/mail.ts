 
import { api } from '@/utils/fetch/api';

export class MailProvider {
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
