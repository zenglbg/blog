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
  Patch,
  Request,
} from '@nestjs/common';
import { RolesGuard, Roles } from '@modules/auth/guards/roles.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/services/user.service'
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create.article.dto';
 

@UseInterceptors(ClassSerializerInterceptor)
@Controller('article')
@UseGuards(RolesGuard)
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

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
   * 获取指定文章
   * @param id
   */
  @Get(':id')
  async findById(@Request() req, @Param('id') id, @Query('status') status) {
    let token = req.headers.authorization;

    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }

    try {
      // const tokenUser = this.jwtService.decode(token) as any;
      // const userId = tokenUser.id;
      // const exist = await this.userService.findById(userId);
      // const isAdmin = userId && exist.role === 'admin';
      return this.articleService.findById(id, status, true);
    } catch (e) {
      return this.articleService.findById(id, status);
    }
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

  /**
   * updateById
   * 更新文章
   */
  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public updateById(@Param('id') id, @Body() article) {
    // console.log(article, typeof article)
    // return {id,article}

    return this.articleService.updateById(id, article);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  public deleteById(@Param('id') id) {
    return this.articleService.deleteById(id);
  }
}
