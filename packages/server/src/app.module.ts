import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import config from './config/config.default';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';
import { LoggerMiddleware } from './common/middleware/LoggerMiddleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/Logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// 用户
import { UserModule } from './modules/user/user.module';
// 用户
// 验证模块
import { AuthModule } from './modules/auth/auth.module';
// 验证模块
// 设置模块
import { SettingModule } from './modules/setting/setting.module';
// 设置模块
// config 模块
import { ConfigModule } from './modules/config/config.module';
// config 模块

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
    ConfigModule,
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
