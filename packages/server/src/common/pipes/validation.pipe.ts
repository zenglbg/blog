import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable()
export class BaseFormDTOValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // 获取到第一个没有通过验证的错误对象
      const error = errors.shift();
      const constraints = error.constraints;
      const contexts = error.contexts;
      // 将未通过验证的字段的错误信息和状态码，以ApiException的形式抛给我们的全局异常过滤器
      for (const key of Object.keys(constraints)) {
        throw new ApiException(
          constraints[key],
          contexts[key].errorCode,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return value;
  }
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
