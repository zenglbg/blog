import { NestFactory, Reflector } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

function build(app: INestApplication) {
  if (Number(process.env.OPEN_API_DOCS)) {
    const options = new DocumentBuilder()
      .setTitle('nest后台API')
      .setDescription('供后台管理界面调用的服务端API')
      .setVersion('1.0')
      // .addTag('cats')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
}



function config(app: INestApplication) {
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  const { myApp } = configService.get("base");
  return {
    port,
    myApp,
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, myApp } = config(app);

  app.enableCors({
    origin: "*",
    allowedHeaders:
      'Content-Type,Content-Length, Authorization, token, Accept,X-Requested-With',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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
  build(app);
  /**
   * 全局中间件
   */

  await app.listen(port).then(() => {
    console.log(`
      http://0.0.0.0:${port}
    `);
  });
}
bootstrap();
