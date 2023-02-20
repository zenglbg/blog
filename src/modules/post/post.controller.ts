import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() postData: CreatePostDto) {
    const { title, content, email, categoryId } = postData;
    console.log(
      '🚀 ~ file: post.controller.ts:21 ~ PostController ~ create ~ title, content, email, categoryId ',
      title,
      content,
      email,
      categoryId,
    );
    return this.postService.create({
      title,
      content,
      author: {
        connect: { email },
      },
      category: {
        connect: {
          id: +categoryId,
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() { title, content, email, categoryId, published }: UpdatePostDto,
  ) {
    return this.postService.update(+id, {
      title,
      content,
      published,
      author: {
        connect: { email },
      },
      category: {
        connect: {
          id: +categoryId,
        },
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
