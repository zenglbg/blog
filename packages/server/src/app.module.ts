import * as path from 'path';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';
import { LoggerMiddleware } from './common/middleware/LoggerMiddleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/Logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// 用户
import { UserModule } from './modules/user/user.module';

// 文章
import { ArticleModule } from './modules/article/article.module';

// 分类
import { CategoryModule } from './modules/Category/category.module';

// 标签
import { TagsModule } from './modules/tags/tags.module';

// 验证模块
import { AuthModule } from './modules/auth/auth.module';

// 设置模块
import { SettingModule } from './modules/setting/setting.module';

// config 模块
import { ConfigModule } from './modules/config/config.module';

// 数据库
import { orm } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule,
    orm(),
    AuthModule,
    UserModule,
    CategoryModule,
    TagsModule,
    ArticleModule,
    SettingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ApiParamsValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
