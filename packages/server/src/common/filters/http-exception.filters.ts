import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 在请求上下文中获取 response 对象
    const request = ctx.getRequest(); // 在请求上下文中获取 request 对象
    const status = exception.getStatus(); // 获取异常的状态码
    const err_response = exception.getResponse(); // 获取异常的状态码

    const err_message =
      /Object/.test(Object.prototype.toString.call(err_response)) &&
      err_response['message']
        ? err_response['message']
        : err_response;

    response.status(status).json({
      statusCode: status,
      message: err_message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
