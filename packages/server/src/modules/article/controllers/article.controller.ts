import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpStatus,
  HttpCode,
  Query,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
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

  /**
   * create
   * 创建文章
   */
  @Post('create')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  public create(@Body() article: CreateArticleDto) {
    return this.articleService.create(article);
  }

  /**
   * findall
   * 获取所有文章
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  public findall(@Query() queryParams) {
    return this.articleService.findAll(queryParams);
  }

  /**
   * findArticleByCategory
   * 获取分类下的所有文章
   */
  @Get('/category/:id')
  @HttpCode(HttpStatus.OK)
  public findArticleByCategory(@Param('id') category, @Query() queryParams) {
    return this.articleService.findArticleByCategory(category, queryParams);
  }

  /**
   * findArticleByCategory
   * 获取分类下的所有文章
   */
  @Get('/tag/:id')
  @HttpCode(HttpStatus.OK)
  public findArticleByTag(@Param('id') tag, @Query() queryParams) {
    return this.articleService.findArticleByTag(tag, queryParams);
  }

  /**
   * getArchives
   * 获取所有文章归档
   */
  @Get('/archives')
  @HttpCode(HttpStatus.OK)
  public getArchives() {
    return this.articleService.getArchives();
  }

  /**
   * recommend
   * 推荐文章
   */
  @Get('/recommend')
  @HttpCode(HttpStatus.OK)
  public recommend(@Query('articleId') articleId) {
    return this.articleService.recommend(articleId);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  public deleteById(@Param('id') id) {
    return this.articleService.deleteById(id);
  }
}
