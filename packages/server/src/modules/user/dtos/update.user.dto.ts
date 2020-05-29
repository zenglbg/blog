import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsUUID('all', { message: 'id不能为空' })
  readonly id: number;
}
