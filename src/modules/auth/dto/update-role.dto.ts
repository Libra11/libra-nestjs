/*
 * @Author: Libra
 * @Date: 2025-01-03 16:50:23
 * @LastEditors: Libra
 * @Description: 更新角色DTO
 */
import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
