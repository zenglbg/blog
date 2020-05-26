import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class UpdatePasswordUserDto {
  @IsUUID()
  readonly id: number;

  @IsString({ message: '密码必须为字符串' })
  @MinLength(6, {
    message: '密码长度不能小于6',
  })
  @MaxLength(30, {
    message: '密码长度不能超过30',
  })
  readonly oldPassword: string;

  @IsString({ message: '密码必须为字符串' })
  @MinLength(6, {
    message: '密码长度不能小于6',
  })
  @MaxLength(30, {
    message: '密码长度不能超过30',
  })
  readonly newPassword: string;
}
