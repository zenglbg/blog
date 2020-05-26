import {
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  readonly id: number;
}
