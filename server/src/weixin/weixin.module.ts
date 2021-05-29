import { Module } from '@nestjs/common';
import { WeixinController } from './weixin.controller';
import { WeixinService } from './weixin.service';

@Module({
  controllers: [WeixinController],
  providers: [WeixinService],
})
export class WeixinModule {}
