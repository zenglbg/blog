import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from '../modules/example/example.controller';
import { AppService } from '../modules/example/app.service';

describe('AppController', () => {
  let appController: ExampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [AppService],
    }).compile();

    appController = app.get<ExampleController>(ExampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
