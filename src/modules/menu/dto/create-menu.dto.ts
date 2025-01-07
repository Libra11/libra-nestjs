/*
 * @Author: Libra
 * @Date: 2025-01-06 16:05:24
 * @LastEditors: Libra
 * @Description:
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: '菜单名称' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ description: '路由路径', required: false })
  @IsOptional()
  @IsString()
  path?: string;

  @ApiProperty({ description: '组件路径', required: false })
  @IsOptional()
  @IsString()
  component?: string;

  @ApiProperty({ description: '菜单图标', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: '排序', required: false })
  @IsOptional()
  @IsNumber()
  sort?: number;

  @ApiProperty({ description: '是否隐藏', required: false })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @ApiProperty({ description: '父级菜单ID', required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
