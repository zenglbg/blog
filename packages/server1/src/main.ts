import { NestFactory } from "@nestjs/core";
import { AppModule } from "./application.module";
import { INestApplication } from "@nestjs/common";

const rateLimit = require("express-rate-limit");
import compression from "compression";
import helmet from "helmet";

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

function build(app: INestApplication) {
  if (Number(process.env.OPEN_API_DOCS)) {
    const options = new DocumentBuilder()
      .setTitle("nest后台API")
      .setDescription("供后台管理界面调用的服务端API")
      .setVersion("1.0")
      // .addTag('cats')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api-docs", app, document);
  }
}

function config(server: INestApplication) {
  const configService = server.get(ConfigService);
  const port = configService.get("PORT");
  const { myApp } = configService.get("base");
  console.log(`adminPrefix`, myApp);
  return {
    port,
    myApp,
  };
}

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  const { port, myApp } = config(server);

  server.enableCors({
    origin: "*",
    allowedHeaders:
      "Content-Type,Content-Length, Authorization, token, Accept,X-Requested-With",
    methods: "PUT,POST,GET,DELETE,OPTIONS",
  });

  server.setGlobalPrefix(myApp.adminPrefix);

  /**
   * 全局中间件
   */
  server.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
    })
  );
  server.use(compression()); // 启用 gzip 压缩
  // server.use(helmet());
  /**
   * 全局中间件
   */

  build(server);

  await server.listen(port).then(() => {
    console.log(`
      http://0.0.0.0:${port}
    `);
  });
}

bootstrap();
