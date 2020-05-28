import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('setting')
export class SettingController {
  @Post('get')
  @HttpCode(HttpStatus.OK)
  getSetting() {
    return {
      dd: 111,
    };
  }
}
