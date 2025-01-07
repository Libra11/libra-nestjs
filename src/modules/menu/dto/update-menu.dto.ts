/*
 * @Author: Libra
 * @Date: 2025-01-06 17:44:29
 * @LastEditors: Libra
 * @Description: 更新菜单DTO
 */
import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
