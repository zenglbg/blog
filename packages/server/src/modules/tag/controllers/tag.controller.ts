import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { TagService } from '../services/tag.service';
import { ConfigService } from '@nestjs/config';
import { Roles } from '@modules/auth/guards/roles.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('tag')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly configS: ConfigService,
  ) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  create(@Body() tag) {
    return this.tagService.create(tag);
  }

  @Get()
  findAll(@Query() queryParams) {
    return this.tagService.findAll(queryParams);
  }

  @Get(':id')
  findById(@Param('id') id) {
    return this.tagService.findById(id);
  }

  @Get(':id/article')
  getArticleById(@Param('id') id, @Query('status') status) {
    return this.tagService.getArticleById(id, status);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id, @Body() tag) {
    return this.tagService.updateById(id, tag);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.tagService.deleteById(id);
  }
}
