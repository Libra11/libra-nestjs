/*
 * @Author: Libra
 * @Date: 2025-01-02 14:25:00
 * @LastEditors: Libra
 * @Description:
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HttpResponse<T> {
  @ApiProperty({ type: 'number' })
  code: number;

  @ApiProperty({ type: 'string' })
  message: string;

  @ApiPropertyOptional()
  data?: T;

  @ApiProperty({ type: 'string', format: 'date-time' })
  timestamp: string;

  @ApiPropertyOptional({ type: 'string' })
  path?: string;
}
