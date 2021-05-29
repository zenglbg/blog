import { Test, TestingModule } from '@nestjs/testing';
import { WeixinController } from './weixin.controller';

describe('WeixinController', () => {
  let controller: WeixinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeixinController],
    }).compile();

    controller = module.get<WeixinController>(WeixinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
