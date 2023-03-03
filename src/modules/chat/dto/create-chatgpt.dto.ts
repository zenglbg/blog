export class CreateChatgptDto {
  prompt: string;
  model?: string;
}

export class EditorChatgptDto {
  input: string;
  instruction: string;
}
