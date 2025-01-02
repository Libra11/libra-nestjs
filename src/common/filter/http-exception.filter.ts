/*
 * @Author: Libra
 * @Date: 2025-01-02 14:22:00
 * @LastEditors: Libra
 * @Description:
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException } from '../exception/business.exception';
import { HttpResponse } from '../interface/http-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const path = request.url;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let result: HttpResponse<string> = {
      code: status,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path,
    };

    if (exception instanceof BusinessException) {
      const response = exception.getResponse() as HttpResponse<string>;
      status = exception.getStatus();
      result = {
        ...response,
        path,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse() as string | object;
      result = {
        code: status,
        message:
          typeof response === 'string'
            ? response
            : (response as any).message || exception.message,
        timestamp: new Date().toISOString(),
        path,
      };
    } else if (exception instanceof Error) {
      result = {
        code: status,
        message: exception.message || 'Internal server error',
        timestamp: new Date().toISOString(),
        path,
      };
    }

    // 记录错误日志
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : 'Unknown error',
    );

    response.status(status).json(result);
  }
}
