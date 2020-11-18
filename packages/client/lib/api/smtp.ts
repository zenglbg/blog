 
import { api } from '@lib/utils/fetch/api';

export class SMTPApi {
  /**
   * 上传文件
   * @param file
   */
  static async testSendMail(user): Promise<IFile> {
    return api.post("/smtp", {
      to: user,
      subject: "测试",
      text: "测试邮件"
    });
  }
}
