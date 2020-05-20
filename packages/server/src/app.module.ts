import { Module } from '@nestjs/common';
import { AppService } from './modules/example/app.service';

// 示例
import { ExampleModule } from './modules/example/example.module';
// 示例

// 用户
import { UserModule } from './modules/user/user.module';
// 用户

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
