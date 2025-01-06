/*
 * @Author: Libra
 * @Date: 2025-01-03 16:50:36
 * @LastEditors: Libra
 * @Description: 创建角色DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色代码', example: 'admin' })
  @IsNotEmpty({ message: '角色代码不能为空' })
  @IsString()
  code: string;

  @ApiProperty({ description: '角色名称', example: '管理员' })
  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ description: '角色描述', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '权限ID列表', type: [Number], required: false })
  @IsOptional()
  @IsArray()
  permissionIds?: number[];
}
