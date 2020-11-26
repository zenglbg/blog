import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './models/setting.entity';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), AuthModule],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService]
})
export class SettingModule {}
