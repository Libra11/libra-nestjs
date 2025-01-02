/*
 * @Author: Libra
 * @Date: 2024-12-27 18:19:19
 * @LastEditors: Libra
 * @Description: 安全中间件
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  private helmet = helmet();
  private rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟
    max: 100, // 每个IP限制100个请求
    message: {
      code: 429,
      message: '请求过于频繁，请稍后再试',
      timestamp: new Date().toISOString(),
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    // 应用 Helmet
    this.helmet(req, res, () => {
      // 应用速率限制
      this.rateLimiter(req, res, next);
    });
  }
}
