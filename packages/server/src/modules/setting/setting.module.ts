import { Module } from '@nestjs/common';
import { SettingController } from './constrollers/setting.controller';
@Module({
  controllers: [SettingController],
})
export class SettingModule {}
