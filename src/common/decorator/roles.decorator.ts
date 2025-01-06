/*
 * @Author: Libra
 * @Date: 2025-01-03 15:59:06
 * @LastEditors: Libra
 * @Description: 角色装饰器
 */
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
