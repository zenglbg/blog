import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('custom message', 409);
  }
}
