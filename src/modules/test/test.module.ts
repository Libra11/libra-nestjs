/*
 * @Author: Libra
 * @Date: 2024-12-27 14:47:39
 * @LastEditors: Libra
 * @Description: 用户模块
 */
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [TestService],
  /**
   * 如果每个模块都单独注册同一个服务，会导致：
   * 创建多个相同服务的实例
   * 浪费内存
   * 各个实例之间的状态可能不一致
   *
   * 通过在一个模块中注册服务并导出，其他模块通过导入的方式使用：
   * 所有模块共享同一个服务实例
   * 节省内存
   * 状态保持同步
   */
  exports: [TestService],
})
export class TestModule {}
