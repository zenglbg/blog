import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('WEIXIN example')
    .setDescription('The WEIXIN API description')
    .setVersion('1.0')
    .addTag('WEIXIN')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () =>
    console.log(`
    http://localhost:${port}
  `),
  );
}
bootstrap();
