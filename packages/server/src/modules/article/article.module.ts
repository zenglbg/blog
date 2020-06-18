import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ArticleController } from './controllers/article.controller';

import { ArticleService } from './services/article.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
