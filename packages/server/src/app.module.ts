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

// 页面
import { PageModule } from './modules/page/page.module'

// 分类
import { CategoryModule } from './modules/category/category.module';

// 标签
import { TagsModule } from './modules/tag/tag.module';

// 验证模块
import { AuthModule } from './modules/auth/auth.module';

// 设置模块
import { SettingModule } from './modules/setting/setting.module';

// config 模块
import { configModule } from './modules/config/config.module';

// 数据库
import { orm } from './modules/database/database.module';

// 文件
import { FileModule } from './modules/file/file.module'
@Module({
  imports: [
    configModule(),
    orm(),
    AuthModule,
    UserModule,
    PageModule,
    CategoryModule,
    TagsModule,
    ArticleModule,
    SettingModule,
    FileModule
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
