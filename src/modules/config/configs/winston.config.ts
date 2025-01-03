/*
 * @Author: Libra
 * @Date: 2025-01-02 14:38:51
 * @LastEditors: Libra
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';

@Injectable()
export class WinstonConfig {
  constructor(private configService: ConfigService) {}

  get config() {
    const logDir = 'logs';

    return {
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('LibraDoc', {
              prettyPrint: true,
              colors: true,
            }),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: join(logDir, 'info'),
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: join(logDir, 'error'),
          filename: 'error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    };
  }
}
