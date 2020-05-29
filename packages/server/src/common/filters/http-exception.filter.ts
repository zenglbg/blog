import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 在请求上下文中获取 response 对象
    const request = ctx.getRequest(); // 在请求上下文中获取 request 对象
    const status = exception.getStatus(); // 获取异常的状态码

    if (exception instanceof ApiException) {
      response.status(status).json({
        statusCode: status,
        errorMessage: exception.getErrorMessage(),
        date: new Date().toLocaleDateString(),
        path: request.url,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        date: new Date().toLocaleDateString(),
        path: request.url,
      });
    }
  }
}
