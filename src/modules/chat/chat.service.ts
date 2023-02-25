import { Injectable } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatGptService } from 'nestjs-chatgpt';
@Injectable()
export class ChatService {
  constructor(private readonly chatGptService: ChatGptService) {}

  create(createChatgptDto: CreateChatDto) {
    console.log(
      '🚀 ~ file: chat.service.ts:11 ~ ChatService ~ create ~ createChatgptDto:',
      createChatgptDto,
    );
    return this.chatGptService.generateTextGPT3(createChatgptDto);
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
