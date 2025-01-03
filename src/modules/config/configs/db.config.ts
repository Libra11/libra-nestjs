/*
 * @Author: Libra
 * @Date: 2025-01-03 11:13:56
 * @LastEditors: Libra
 * @Description: 数据库配置
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DbConfig {
  constructor(private configService: ConfigService) {}

  get config(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<string>('DB_TYPE') as 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [],
      synchronize: true,
      logging: true,
    };
  }
}
