import {
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ApiErrorCode } from '@common/enums/api-error-code.enum';
import { Category } from '@modules/Category/Models/category.entity';
import { Tag } from '@modules/tag/Models/tag.entity';

export enum Gender {
  draft = 'draft',
  publish = 'publish',
}

export class CreateArticleDto {
  @IsString({
    message: '标题必须为字符串',
    context: { errorCode: ApiErrorCode.ARTICLE_TITLE_INVALID },
  })
  @IsNotEmpty({
    message: '标题不能为空',
    context: { errorCode: ApiErrorCode.ARTICLE_TITLE_INVALID },
  })
  @MaxLength(255, {
    message: '标题长度不能超过255',
    context: { errorCode: ApiErrorCode.ARTICLE_TITLE_INVALID },
  })
  title: string;

  @IsNotEmpty({
    message: '内容不能为空',
    context: { errorCode: ApiErrorCode.ARTICLE_CONTEXT_INVALID },
  })
  content: string;

  cover: string;

  summary: string;

  category: Category;

  tags: Array<Tag>;

  // @Column('simple-enum', { enum: ['draft', 'publish'] })
  @IsEnum(Gender, {
    message: 'status必须为draft,publish中的其中一个',
    context: { errorCode: ApiErrorCode.ARTICLE_STATUS_INVALID },
  })
  status: string;

  views: number;

  password: string;

  needPassword: boolean;

  isCommentable: boolean;

  publishAt: Date;
}
