/*
 * @Author: Libra
 * @Date: 2025-01-03 17:02:17
 * @LastEditors: Libra
 * @Description: 创建权限组DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreatePermissionGroupDto {
  @ApiProperty({ description: '权限组代码', example: 'user' })
  @IsNotEmpty({ message: '权限组代码不能为空' })
  @IsString()
  code: string;

  @ApiProperty({ description: '权限组名称', example: '用户管理' })
  @IsNotEmpty({ message: '权限组名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ description: '权限组描述', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: '权限ID列表',
    type: [Number],
    required: false,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  permissionIds?: number[];
}
