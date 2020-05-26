import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '账户必须为字符串' })
  @MinLength(2, {
    message: '账户长度不能小于2',
  })
  @MaxLength(10, {
    message: '账户长度不能超过10',
  })
  readonly name: string;

  @IsString({ message: '密码必须为字符串' })
  @MinLength(6, {
    message: '密码长度不能小于6',
  })
  @MaxLength(30, {
    message: '密码长度不能超过30',
  })
  readonly password: string;

  @IsString({ message: '邮箱必须为字符串' })
  @MinLength(5, {
    message: '邮箱长度不能小于5',
  })
  @MaxLength(50, {
    message: '邮箱长度不能超过50',
  })
  readonly email: string;
}
