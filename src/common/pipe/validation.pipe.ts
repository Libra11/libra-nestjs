/*
 * @Author: Libra
 * @Date: 2025-01-02 15:12:54
 * @LastEditors: Libra
 * @Description: 自定义验证管道
 */
import {
  ValidationPipe,
  ValidationPipeOptions,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

/**
 * 自定义验证管道
 * 继承自 NestJS 的 ValidationPipe，用于请求参数的验证和转换
 */
export class CustomValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      // 启用数据转换，将请求数据转换为 DTO 类型
      transform: true,
      // 启用白名单模式，过滤掉未在 DTO 中声明的属性
      whitelist: true,
      // 当出现未在白名单中的属性时抛出异常
      forbidNonWhitelisted: true,
      // 在非生产环境下启用调试消息
      enableDebugMessages: process.env.NODE_ENV !== 'production',
      // 遇到第一个验证错误就停止验证
      stopAtFirstError: true,
      // 转换选项配置
      transformOptions: {
        // 启用隐式类型转换
        enableImplicitConversion: true,
      },
      // 自定义异常工厂函数
      exceptionFactory: (errors: ValidationError[]) => {
        // 获取第一个错误
        const firstError = errors[0];
        // 获取第一个约束条件的错误消息
        const firstConstraint = Object.values(firstError.constraints || {})[0];

        // 返回格式化的错误响应
        return new BadRequestException({
          code: 400,
          message: firstConstraint || 'Validation failed',
          timestamp: new Date().toISOString(),
          path: undefined,
        });
      },
      // 合并传入的其他选项
      ...options,
    });
  }
}
