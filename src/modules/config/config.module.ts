/*
 * @Author: Libra
 * @Date: 2025-01-03 14:05:20
 * @LastEditors: Libra
 * @Description: 配置模块
 */
import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CommonConfig } from './configs/common.config';
import { CorsConfig } from './configs/cors.config';
import { DbConfig } from './configs/db.config';
import { SwaggerConfig } from './configs/swagger.config';
import { WinstonConfig } from './configs/winston.config';
import { RedisConfig } from './configs/redis.config';

@Global()
@Module({
  providers: [
    ConfigService,
    CommonConfig,
    CorsConfig,
    DbConfig,
    SwaggerConfig,
    WinstonConfig,
    RedisConfig,
  ],
  exports: [
    ConfigService,
    CommonConfig,
    CorsConfig,
    DbConfig,
    SwaggerConfig,
    WinstonConfig,
  ],
})
export class ConfigModule {}
