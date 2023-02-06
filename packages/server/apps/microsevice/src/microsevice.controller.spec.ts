import { Test, TestingModule } from '@nestjs/testing';
import { MicroseviceController } from './microsevice.controller';
import { MicroseviceService } from './microsevice.service';

describe('MicroseviceController', () => {
  let microseviceController: MicroseviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MicroseviceController],
      providers: [MicroseviceService],
    }).compile();

    microseviceController = app.get<MicroseviceController>(MicroseviceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(microseviceController.getHello()).toBe('Hello World!');
    });
  });
});
