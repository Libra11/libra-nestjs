/*
 * @Author: Libra
 * @Date: 2025-01-06 14:04:02
 * @LastEditors: Libra
 * @Description: redis 配置
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfig {
  constructor(private configService: ConfigService) {}

  get config() {
    return {
      host: this.configService.get<string>('REDIS_HOST') || 'localhost',
      port: this.configService.get<number>('REDIS_PORT') || 6379,
      password: this.configService.get<string>('REDIS_PASSWORD'),
      ttl: parseInt(this.configService.get<string>('REDIS_TTL') || '180000'),
    };
  }
}
