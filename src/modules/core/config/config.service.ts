/*
 * @Author: Libra
 * @Date: 2024-12-27 16:38:50
 * @LastEditors: Libra
 * @Description: 配置服务
 */
import { Injectable } from '@nestjs/common';
import { commonConfig } from './configs/common.config';
import { corsConfig } from './configs/cors.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { INestApplication } from '@nestjs/common';
import { setupSwagger } from './configs/swagger.config';

@Injectable()
export class ConfigService {
  getCommonConfig() {
    return commonConfig;
  }

  getCorsOrigins(): CorsOptions {
    return corsConfig;
  }

  setupSwagger(app: INestApplication) {
    return setupSwagger(app);
  }

  getJwtConfig() {
    return commonConfig.jwt;
  }
}
