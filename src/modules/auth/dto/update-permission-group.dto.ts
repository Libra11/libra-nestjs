/*
 * @Author: Libra
 * @Date: 2025-01-07 15:25:06
 * @LastEditors: Libra
 * @Description: 更新权限组
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionGroupDto } from './create-permission-group.dto';

export class UpdatePermissionGroupDto extends PartialType(
  CreatePermissionGroupDto,
) {}
