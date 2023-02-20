import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() { email, name }: CreateUserDto) {
    return this.userService.create({
      email,
      name,
    });
  }

  @Get()
  findAll(
    @Query() { page, size }: { page: number; size: number },
    @Body() where: CreateUserDto,
  ) {
    return this.userService.findAll({
      take: +size,
      skip: (+page - 1) * size,
      where,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({
      id: +id,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('profile')
  updateProfile(@Body() profile: { bio: string; age: number; email: string }) {
    const { bio, age, email } = profile;
    return this.userService.createProfile({
      bio,
      age,
      user: {
        connect: {
          email,
        },
      },
    });
  }

  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.getProfile(+id);
  }
}
