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
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../Models/user.entity';
import { UserService } from '../services/user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) // private readonly jwtService: JwtService,
  {}

  @Get()
  public findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body() user: Partial<User>) {
    return this.userService.createUser(user);
  }
}
