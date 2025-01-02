/*
 * @Author: Libra
 * @Date: 2024-12-27 16:38:50
 * @LastEditors: Libra
 * @Description: 配置模块
 */
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
