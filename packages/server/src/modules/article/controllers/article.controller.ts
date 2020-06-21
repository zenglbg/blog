import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpStatus,
  HttpCode,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RolesGuard, Roles } from '@modules/auth/guards/roles.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

import { ArticleService } from '../services/article.service';
import { CreateArticleDto } from '../dtos/create.article.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('article')
@UseGuards(RolesGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  /**
   * create
   */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  public create(@Body() article: CreateArticleDto) {
    return this.articleService.create(article);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  /**
   * findall
   *
   */
  public findall(@Query() queryParams) {
    return this.articleService.findAll(queryParams);
  }
}
