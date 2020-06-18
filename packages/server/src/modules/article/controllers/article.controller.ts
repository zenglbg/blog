import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RolesGuard, Roles } from '@modules/auth/guards/roles.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

import { ArticleService } from '../services/article.service';

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
  public create(@Body() article) {
    return this.articleService.create(article);
  }
}
