/*
 * @Author: Libra
 * @Date: 2025-01-03 16:47:36
 * @LastEditors: Libra
 * @Description: 创建权限DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export enum PermissionType {
  MENU = 'menu',
  BUTTON = 'button',
  API = 'api',
}

export class CreatePermissionDto {
  @ApiProperty({ description: '权限代码', example: 'user:create' })
  @IsNotEmpty({ message: '权限代码不能为空' })
  @IsString()
  code: string;

  @ApiProperty({ description: '权限名称', example: '创建用户' })
  @IsNotEmpty({ message: '权限名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ description: '权限描述', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: '权限类型',
    enum: PermissionType,
    example: PermissionType.API,
  })
  @IsNotEmpty({ message: '权限类型不能为空' })
  @IsEnum(PermissionType)
  type: PermissionType;

  @ApiProperty({ description: '所属权限组ID' })
  @IsNotEmpty({ message: '权限组不能为空' })
  groupId: number;
}
