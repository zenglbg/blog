import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from '@modules/auth/guards/roles.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(RolesGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('article')
  searchArticle(@Query('keyword') keyword) {
    return this.searchService.searchArticle('article', keyword);
  }

  @Get()
  findall(@Query() queryParam) {
    return this.searchService.findall(queryParam);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.searchService.deleteById(id);
  }
}
