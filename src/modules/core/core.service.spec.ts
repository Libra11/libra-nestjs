/*
 * @Author: Libra
 * @Date: 2024-12-27 16:39:36
 * @LastEditors: Libra
 * @Description: 核心服务测试
 */
import { Test, TestingModule } from '@nestjs/testing';
import { CoreService } from './core.service';
import { ConfigModule } from './config/config.module';
describe('CoreService', () => {
  let service: CoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [CoreService],
    }).compile();

    service = module.get<CoreService>(CoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
