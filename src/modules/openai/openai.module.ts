import { Global, Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Global()
@Module({})
export class OpenaiModule {
  static forRoot(apiKey: string) {
    const providers = [
      {
        provide: OpenaiService,
        useFactory: async () => {
          return new OpenaiService(apiKey);
        },
      },
    ];
    return {
      module: OpenaiModule,
      providers,
      exports: providers,
    };
  }
}