/*
 * @Author: Libra
 * @Date: 2025-01-03 14:05:20
 * @LastEditors: Libra
 * @Description: 配置服务
 */
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { CommonConfig } from './configs/common.config';
import { CorsConfig } from './configs/cors.config';
import { DbConfig } from './configs/db.config';
import { SwaggerConfig } from './configs/swagger.config';
import { WinstonConfig } from './configs/winston.config';

@Injectable()
export class ConfigService {
  constructor(
    private configService: NestConfigService,
    private commonConfig: CommonConfig,
    private corsConfig: CorsConfig,
    private dbConfig: DbConfig,
    private swaggerConfig: SwaggerConfig,
    private winstonConfig: WinstonConfig,
  ) {}

  get(key: string): string {
    return this.configService.get<string>(key);
  }

  getCommonConfig() {
    return this.commonConfig.config;
  }

  getCorsConfig() {
    return this.corsConfig.config;
  }

  getDbConfig() {
    return this.dbConfig.config;
  }

  setupSwagger(app) {
    return this.swaggerConfig.setup(app);
  }

  getWinstonConfig() {
    return this.winstonConfig.config;
  }
}
