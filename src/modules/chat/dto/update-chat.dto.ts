import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';

export class UpdateChatDto extends PartialType(CreateChatDto) {}

export class ChatGptResponse {
  choices: [
    {
      text: string;
      log_probs: number[];
    },
  ];
}
