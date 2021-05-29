import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { AdsModule } from './ads/ads.module';
import { TagsModule } from './tags/tags.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { MusicModule } from './music/music.module';
import { VedioModule } from './vedio/vedio.module';
import { WeixinModule } from './weixin/weixin.module';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception';
// import { AllExceptionFilter } from './common/filters/all-exception';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/base', {
      // user: 'root',
      // pass: 'example',
      user: 'nest',
      pass: 'nest',
      useNewUrlParser: true,
      /**
       * 这样就不会出现由于权限的问题而无法连接了，但是要注意，在mongodb的admin下建的账户，在子数据库中是不能直接验证的，同时也为了安全，应该在每个数据库下都建立不同权限的账户
       * 必须简单使用admin 验证，不然会报错。
       * 如果不使用admin的账号，必须对每个新建的数据库创建对应的账号密码
       */
      // authSource: 'admin',
    }),
    UserModule,
    PostsModule,
    AuthModule,
    ConfigModule,
    AdsModule,
    TagsModule,
    CategoryModule,
    MenuModule,
    MusicModule,
    VedioModule,
    WeixinModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionFilter,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
