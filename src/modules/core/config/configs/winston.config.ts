/*
 * @Author: Libra
 * @Date: 2025-01-02 14:38:51
 * @LastEditors: Libra
 * @Description:
 */
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';

const logDir = 'logs';

export const winstonConfig = {
  transports: [
    // 控制台日志
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
    // 信息日志文件
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
    // 错误日志文件
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
