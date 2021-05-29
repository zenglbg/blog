import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(msg = '没有权限') {
    super(msg, HttpStatus.FORBIDDEN);
  }
}
