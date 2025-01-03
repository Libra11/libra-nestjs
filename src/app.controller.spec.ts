/*
 * @Author: Libra
 * @Date: 2024-12-27 14:33:00
 * @LastEditors: Libra
 * @Description: 主控制器测试
 */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World"', () => {
      expect(appController.getHello()).toBe('Hello World');
    });
  });
});
