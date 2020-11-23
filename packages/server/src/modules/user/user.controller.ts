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
  Request,
  UseGuards,
  Headers,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdatePasswordUserDto,
} from './dtos/index.user.dto';
import { Request as Req } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('a')
  @Roles('visitor')
  @HttpCode(HttpStatus.CREATED)
  findOne(@Body() user: CreateUserDto) {
    return user;
  }

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  public findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Get('currentUser')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public currentUser(@Headers('token') token) {
    return this.userService.currentUser(token);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('update')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  /**
   * update
   *
   */
  public update(@Request() req, @Body() user: UpdateUserDto) {
    return this.userService.updateById(user);
  }

  @Post('xg_password')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  /**
   * password
   */
  public password(@Request() req: Req, @Body() user: UpdatePasswordUserDto) {
    return this.userService.updatePassword(user);
  }
}
