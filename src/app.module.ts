import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
// import { PrismaService } from '../prisma.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ChatModule } from './modules/chat/chat.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [UserModule, PostModule, ChatModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
