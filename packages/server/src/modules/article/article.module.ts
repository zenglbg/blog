import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ArticleController } from './controllers/article.controller';

import { ArticleService } from './services/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './Models/article_info.entity';
import { TagsModule } from '@modules/tag/tag.module';
import { CategoryModule } from '@modules/Category/category.module';
import { ArticleContent } from './Models/article_content.entity';
import { UserModule } from '@modules/user/user.module'
@Module({
  imports: [
    TypeOrmModule.forFeature([Article, ArticleContent]),
    forwardRef(() => AuthModule),
    TagsModule,
    CategoryModule,
    UserModule
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule { }
