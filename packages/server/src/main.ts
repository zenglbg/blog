import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configDefault from './config/config.default';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8888).then(() => {
    console.log(`
      http://0.0.0.0:8888
    `);
  });
}
bootstrap();
