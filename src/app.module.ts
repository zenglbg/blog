import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
// import { ChatGptModule } from './modules/chatgpt/chatgpt.module';
import { ChatGptModule } from 'nestjs-chatgpt';
// import { PrismaService } from '../prisma.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ChatModule } from './modules/chat/chat.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ChatGptModule.forRoot(
      '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',
    ),
    UserModule,
    PostModule,
    ChatModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_CUS_SERVER',
      useFactory: async () => {
        return {
          // new它或者你自己想办法能够实现这个类结构 也是ok的
          getHello: () => {
            return '666';
          },
        };
      },
    },
  ],
})
export class AppModule {}
