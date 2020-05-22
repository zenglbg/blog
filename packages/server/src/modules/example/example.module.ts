import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ExampleController } from './example.controller';
@Module({
  controllers: [ExampleController],
  providers: [AppService],
})
export class ExampleModule {}
