import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import config from './config/config.default';
import { LoggerMiddleware } from './common/middleware/LoggerMiddleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filters';
import { LoggingInterceptor } from './common/interceptors/Logging.interceptor';

// 示例
import { ExampleModule } from './modules/example/example.module';
// 示例

// 用户
import { UserModule } from './modules/user/user.module';
// 用户
// 验证模块
import { AuthModule } from './modules/auth/auth.module';
// 验证模块

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config().ormconfig,
      entities: [path.join(__dirname, './modules/**/**.entity{.ts,.js}')],
      migrations: [path.join(__dirname, '../migrations')],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ExampleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('user');
  }
}
