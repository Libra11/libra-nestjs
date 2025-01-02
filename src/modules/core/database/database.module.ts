/*
 * @Author: Libra
 * @Date: 2024-12-27 16:38:58
 * @LastEditors: Libra
 * @Description: 数据库模块
 */
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
