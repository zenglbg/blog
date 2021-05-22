import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @Get('one')
  getOne(@Query('id') _id) {
    return this.userService.getOne(_id);
  }

  @Post('update')
  updateOne(@Query('id') _id, @Body() body) {
    return this.userService.updateOne(_id, body);
  }

  @Get('delete')
  delete(@Query('id') _id) {
    return this.userService.deleteOne(_id);
  }

  @Post('add')
  setUser(@Body() body: any) {
    return this.userService.setUser(body);
  }

  @Post('getSession')
  getSession(@Body() body: any) {
    return this.userService.getSession(body);
  }

  @Post('login')
  doLogin(@Body() body: any) {
    return this.userService.doLogin(body);
  }
}
