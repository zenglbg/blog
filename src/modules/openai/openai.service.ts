import { Injectable } from '@nestjs/common';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { UpdateOpenaiDto } from './dto/update-openai.dto';
import { EditorChatgptDto } from '../chat/dto/create-chatgpt.dto';

import {
  OpenAIApi,
  Configuration,
  CreateImageRequestSizeEnum,
  CreateEditRequest,
} from 'openai';

@Injectable()
export class OpenaiService {
  private readonly apiKey: string;
  public readonly openai: OpenAIApi;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    const config = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(config);
    this.init();
  }

  async init() {
    // const response = await this.openai.listEngines();
  }
  async qa({ prompt }: CreateOpenaiDto) {
    console.log(
      '🚀 ~ file: openai.service.ts:18 ~ OpenaiService ~ create ~ prompt:',
      prompt,
    );
    const res = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 1,
      max_tokens: 100,
    });
    return res.data.choices;
  }

  async img({ prompt }: CreateOpenaiDto) {
    const res = await this.openai.createImage({
      // model: 'image-alpha-001',
      prompt,
      size: CreateImageRequestSizeEnum._1024x1024,
      n: 1,
    });
    return res.data.data[0].url;
  }

  async editorText({ input, instruction }: EditorChatgptDto) {
    return this.editor({ model: 'text-davinci-edit-001', input, instruction });
  }

  async editor({ input, instruction, model }: CreateEditRequest) {
    const res = await this.openai.createEdit({
      model,
      n: 1,
      input: input,
      instruction: instruction,
      temperature: 0.8,
      top_p: 0.5,
    });
    return res.data;
  }

  findAll() {
    return `This action returns all openai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openai`;
  }

  update(id: number, updateOpenaiDto: UpdateOpenaiDto) {
    return `This action updates a #${id} openai`;
  }

  remove(id: number) {
    return `This action removes a #${id} openai`;
  }
}
