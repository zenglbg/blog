import { Injectable } from '@nestjs/common';
import { Comment } from './models/comment.entity';

@Injectable()
export class CommentService {
  /**
   * create
   */
  public create(userAgent, comment: Partial<Comment>) {
    const { hostId, name, email, content } = comment;
  }
}
