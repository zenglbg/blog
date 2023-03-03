import { Injectable, HttpException, Inject } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateChatgptDto, EditorChatgptDto } from './dto/create-chatgpt.dto';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject('OpenaiService') private readonly openai: OpenaiService,
  ) {}

  qa({ prompt }: CreateChatDto) {
    // return this.generateTextGPT3(createChatgptDto);
    return this.openai.qa({ prompt }).then((res) => (res[0] || {}).text);
  }

  img({ prompt }: CreateChatDto) {
    return this.openai.img({ prompt });
  }

  editor({ input, instruction }: EditorChatgptDto) {
    return this.openai.editorText({ input, instruction });
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

  // async generateTextGPT3({ prompt }: CreateChatgptDto) {
  //   return this.generateText({ prompt, model: 'text-davinci-003' });
  // }
  // async generateText({ prompt, model }: CreateChatgptDto) {
  //   try {
  //     const response = await axios.post<ChatGptResponse>(
  //       'https://api.openai.com/v1/completions',
  //       {
  //         model,
  //         prompt,
  //         temperature: 1,
  //         max_tokens: 100,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${this.apiKey}`,
  //         },
  //       },
  //     );
  //     return response.data;
  //   } catch (error: any) {
  //     throw new HttpException('Falha ao gerar texto', error.response.status);
  //   }
  // }

  // async generateEditor({ model, prompt }) {
  //   try {
  //     const response = await axios.post<ChatGptResponse>(
  //       'https://api.openai.com/v1/completions',
  //       {
  //         model,
  //         prompt,
  //         temperature: 1,
  //         max_tokens: 100,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${this.apiKey}`,
  //         },
  //       },
  //     );
  //     return response.data;
  //   } catch (error: any) {
  //     throw new HttpException('Falha ao gerar texto', error.response.status);
  //   }
  // }
}
