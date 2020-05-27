import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class UpdatePasswordUserDto {
  @IsUUID('all', { message: 'id不能为空' })
  readonly id: number;

  @IsString({ message: '请输入旧密码' })
  @MinLength(6, {
    message: '旧密码密码长度不能小于6',
  })
  @MaxLength(30, {
    message: '旧密码密码长度不能超过30',
  })
  readonly oldPassword: string;

  @IsString({ message: '请输入新密码' })
  @MinLength(6, {
    message: '新密码长度不能小于6',
  })
  @MaxLength(30, {
    message: '新密码长度不能超过30',
  })
  readonly newPassword: string;
}
