import { ArticleModule } from '@modules/article/article.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { Search } from './search.entity';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Search]), AuthModule, ArticleModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
