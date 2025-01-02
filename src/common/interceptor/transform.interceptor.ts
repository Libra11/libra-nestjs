/*
 * @Author: Libra
 * @Date: 2025-01-02 15:24:36
 * @LastEditors: Libra
 * @Description: 响应拦截器
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../interface/http-response.interface';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, HttpResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 获取自定义的响应元数据
    const metadata =
      this.reflector.get('response_metadata', context.getHandler()) || {};

    return next.handle().pipe(
      map((data) => ({
        code: metadata.code || response.statusCode,
        data,
        message: metadata.message || 'Success',
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
