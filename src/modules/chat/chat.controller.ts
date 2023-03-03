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
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { EditorChatgptDto } from './dto/create-chatgpt.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('qa')
  qa(@Body() createChatDto: CreateChatDto) {
    return this.chatService.qa(createChatDto);
  }

  @Get('img')
  img(@Query() createChatDto: CreateChatDto) {
    console.log(
      '🚀 ~ file: chat.controller.ts:27 ~ ChatController ~ img ~ createChatDto:',
      createChatDto,
    );
    return this.chatService.img(createChatDto);
  }

  @Post('editor')
  editor(@Body() editor: EditorChatgptDto) {
    return this.chatService.editor(editor);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
