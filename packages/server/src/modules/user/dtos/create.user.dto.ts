import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiErrorCode } from '../../../common/enums/api-error-code.enum';

export class CreateUserDto {
  @IsString({
    message: '账户必须为字符串',
    context: { errorCode: ApiErrorCode.USER_NAME_INVALID },
  })
  @MinLength(2, {
    message: '账户长度不能小于2',
    context: { errorCode: ApiErrorCode.USER_NAME_INVALID },
  })
  @MaxLength(10, {
    message: '账户长度不能超过10',
    context: { errorCode: ApiErrorCode.USER_NAME_INVALID },
  })
  readonly name: string;

  @IsString({
    message: '密码必须为字符串',
    context: { errorCode: ApiErrorCode.USER_PASSWORD_INVALID },
  })
  @MinLength(6, {
    message: '密码长度不能小于6',
    context: { errorCode: ApiErrorCode.USER_PASSWORD_INVALID },
  })
  @MaxLength(30, {
    message: '密码长度不能超过30',
    context: { errorCode: ApiErrorCode.USER_PASSWORD_INVALID },
  })
  readonly password: string;

  @IsString({
    message: '邮箱必须为字符串',
    context: { errorCode: ApiErrorCode.USER_EMAIL_INVALID },
  })
  @MinLength(5, {
    message: '邮箱长度不能小于5',
    context: { errorCode: ApiErrorCode.USER_EMAIL_INVALID },
  })
  @MaxLength(50, {
    message: '邮箱长度不能超过50',
    context: { errorCode: ApiErrorCode.USER_EMAIL_INVALID },
  })
  readonly email: string;
}
