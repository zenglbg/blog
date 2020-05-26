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
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../Models/user.entity';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../auth/guards/roles.guard';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdatePasswordUserDto,
} from '../Models/index.user.dto';
import { Request as Req } from 'express';
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
  public register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  /**
   * update
   *
   */
  public update(@Request() req, @Body() user: UpdateUserDto) {
    return this.userService.updateById(user);
  }

  @Post('xg_password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  /**
   * password
   */
  public password(@Request() req: Req, @Body() user: UpdatePasswordUserDto) {
    return this.userService.updatePassword(user);
  }
}
