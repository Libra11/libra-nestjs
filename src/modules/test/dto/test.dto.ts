/*
 * @Author: Libra
 * @Date: 2025-01-02 15:45:48
 * @LastEditors: Libra
 * @Description: 测试DTO
 */
import { ApiProperty } from '@nestjs/swagger';

export class TestDto {
  @ApiProperty({ description: '姓名' })
  name: string;

  @ApiProperty({ description: '年龄' })
  age: number;
}
