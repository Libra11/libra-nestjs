/*
 * @Author: Libra
 * @Date: 2024-12-27 16:39:36
 * @LastEditors: Libra
 * @Description:
 */
import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { CommonModule } from 'src/modules/core/common/common.module';
import { ConfigModule } from 'src/modules/core/config/config.module';
import { DatabaseModule } from 'src/modules/core/database/database.module';

// @Global()
// @Global（） 装饰器使模块成为全局范围的。
// 让一切都全球化不是一个好的设计决策。全局模块可用于减少必要的样板数量。imports 数组通常是使模块的 API 可供使用者使用的首选方式。
@Module({
  controllers: [CoreController],
  providers: [CoreService],
  /**
   * Module 既能被导入到 CoreModule，又能从 CoreModule中被导出
   * 可以通过一个核心模块（如 CoreModule）统一管理和导出多个基础模块
   * 其他模块只需要导入这一个核心模块，而不是分别导入多个模块
   *
   * 隐藏具体实现细节
   * 将来如果需要替换 CommonModule，只需要在 CoreModule 中修改，使用方不需要改动
   */
  exports: [CoreService, CommonModule, ConfigModule, DatabaseModule],

  imports: [CommonModule, ConfigModule, DatabaseModule],
})
export class CoreModule {}
