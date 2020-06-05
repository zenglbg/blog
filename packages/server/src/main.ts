import { NestFactory, Reflector } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import configDefault from './config/config.default';
const { myApp } = configDefault();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Content-Type,Content-Length, Authorization, token, Accept,X-Requested-With',
    methods: 'PUT,POST,GET,DELETE,OPTIONS',
  });
  app.setGlobalPrefix(myApp.adminPrefix);
  /**
   * 全局中间件
   */
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
    }),
  );
  app.use(compression()); // 启用 gzip 压缩
  app.use(helmet());
  /**
   * 全局中间件
   */

  await app.listen(9999).then(() => {
    console.log(`
      http://0.0.0.0:9999
    `);
  });
}
bootstrap();
