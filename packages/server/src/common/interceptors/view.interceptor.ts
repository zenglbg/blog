import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from, of } from 'rxjs';
import * as util from 'util';
import { map, switchMap } from 'rxjs/operators';
import { View } from '../libs/View';
@Injectable()
export class ViewInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    // 拿到 response 对象
    const response = context.switchToHttp().getResponse();

    // 将 render 回调函数转成一个 promisify 然后绑定执行的上下文
    const render = util.promisify(response.render.bind(response));

    return call$.handle().pipe(
      switchMap(value => {
        if (value instanceof View) {
          // 返回渲染后的 html
          return from(render(value.name, value.data));
        }

        return of(value);
      }),
    );
  }
}
