/*
 * @Author: Libra
 * @Date: 2025-01-02 11:19:28
 * @LastEditors: Libra
 * @Description: 通用配置
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonConfig {
  constructor(private configService: ConfigService) {}

  get config() {
    return {
      port: this.configService.get<number>('PORT') || 3000,
      jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        accessToken: {
          expiresIn: '1h',
        },
        refreshToken: {
          expiresIn: '7d',
        },
      },
    };
  }
}
