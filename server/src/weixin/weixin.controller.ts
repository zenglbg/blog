import { Controller, Post, Body } from '@nestjs/common';
import { WeixinService } from './weixin.service';

@Controller('weixin')
export class WeixinController {
  constructor(private readonly weixinService: WeixinService) {}

  @Post('getSession')
  getSession(@Body() body: any) {
    return this.weixinService.getSession(body);
  }
}
