import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { Roles } from '@modules/auth/guards/roles.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CategoryService } from '../service/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  create(@Body() category) {
    return this.categoryService.create(category);
  }

  @Get()
  findAll(@Query() queryParams) {
    return this.categoryService.findAll(queryParams);
  }

  //获取指定id的标签
  @Get(':id')
  findById(@Param('id') id) {
    return this.categoryService.findById(id);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id) {
    return this.categoryService.findById(id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    this.categoryService.deleteById(id);
  }
}
