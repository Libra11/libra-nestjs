/*
 * @Author: Libra
 * @Date: 2025-01-02 15:27:48
 * @LastEditors: Libra
 * @Description: 响应装饰器
 */
import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = 'response_message';
export const RESPONSE_CODE = 'response_code';

export interface ResponseMetadata {
  code?: number;
  message?: string;
}

export const ResponseData = (metadata: ResponseMetadata) =>
  SetMetadata('response_metadata', metadata);
