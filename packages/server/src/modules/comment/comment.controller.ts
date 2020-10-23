import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { CommentService } from './comment.service';


@Controller('comment')
@UseGuards(RolesGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public create(@Request() req: Req, @Body() comment) {
    const userAgent = req.header['user-agent'];
    return this.commentService.create(userAgent, comment);
  }
}
