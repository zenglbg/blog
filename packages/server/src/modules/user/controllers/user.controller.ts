import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  Inject,
  forwardRef,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../Models/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../auth/guards/roles.guard';
// import { AuthGuard } from '../../auth/guards/auth.guard';
import { EGuard } from '../../auth/guards/eee.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  public findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body() user: Partial<User>) {
    return this.userService.createUser(user);
  }
}
