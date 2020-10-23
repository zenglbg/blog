import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '@modules/auth/guards/roles.guard';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
@UseGuards(RolesGuard)
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  update(@Body() setting) {
    return this.settingService.update(setting);
  }

  @Post('get')
  @HttpCode(HttpStatus.OK)
  getSetting(@Request() req) {
    return this.settingService.findAll(req);
  }
}
