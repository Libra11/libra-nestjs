/*
 * @Author: Libra
 * @Date: 2025-01-02 14:23:05
 * @LastEditors: Libra
 * @Description:
 */
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, code: number = HttpStatus.BAD_REQUEST) {
    super(
      {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
      code,
    );
  }
}
