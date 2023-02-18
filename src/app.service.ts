import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: `是时候专注的做一件事情了`,
    };
  }
}
