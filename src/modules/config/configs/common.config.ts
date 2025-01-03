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
        secret:
          this.configService.get<string>('JWT_SECRET') || 'libra-secret-key',
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '1d',
      },
    };
  }
}
