/*
 * @Author: Libra
 * @Date: 2024-12-27 16:39:36
 * @LastEditors: Libra
 * @Description: 核心控制器测试
 */
import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { ConfigModule } from './config/config.module';
describe('CoreController', () => {
  let controller: CoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [CoreController],
      providers: [CoreService],
    }).compile();

    controller = module.get<CoreController>(CoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
