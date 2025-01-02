/*
 * @Author: Libra
 * @Date: 2024-12-27 16:39:36
 * @LastEditors: Libra
 * @Description: 核心服务
 */
import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class CoreService {
  constructor(private readonly configService: ConfigService) {}

  getPort() {
    return this.configService.getCommonConfig().port;
  }

  getCorsOrigins() {
    return this.configService.getCorsOrigins();
  }

  setupSwagger(app: INestApplication) {
    return this.configService.setupSwagger(app);
  }

  getJwtConfig() {
    return this.configService.getJwtConfig();
  }
}
