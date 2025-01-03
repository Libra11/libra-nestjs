/*
 * @Author: Libra
 * @Date: 2025-01-03 14:05:20
 * @LastEditors: Libra
 * @Description:
 */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            getCommonConfig: jest.fn().mockReturnValue({}),
            setupSwagger: jest.fn(),
            getCorsConfig: jest.fn().mockReturnValue({}),
            getDbConfig: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
