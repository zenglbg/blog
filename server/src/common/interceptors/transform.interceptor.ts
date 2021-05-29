import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RSA_NO_PADDING } from 'constants';
import { Response, Request, response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        const status = res.statusCode;
        const url = req.originalUrl;
        const { msg } = data;
        const body = msg
          ? {
              code: status,
              success: true,
              ...data,
            }
          : {
              code: status,
              msg: null,
              success: true,
              data,
            };

        return body;
      }),
    );
  }
}
