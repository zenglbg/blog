import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  /**
   * create
   */
  public create(article) {
    return {
      code: 200,
      data: [12, 3, 3, 3, 4, 4, 1],
    };
  }
}
