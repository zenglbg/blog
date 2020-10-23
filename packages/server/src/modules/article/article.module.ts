import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ArticleController } from './article.controller';

import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './models/article_info.entity';
import { TagsModule } from '@modules/tag/tag.module';
import { CategoryModule } from '@modules/category/category.module';
import { ArticleContent } from './models/article_content.entity';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleContent]),
    forwardRef(() => AuthModule),
    TagsModule,
    CategoryModule,
    UserModule,
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
