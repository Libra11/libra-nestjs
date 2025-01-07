/*
 * @Author: Libra
 * @Date: 2025-01-03 16:21:28
 * @LastEditors: Libra
 * @Description: 权限守卫
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../../common/decorator/permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userPermissions = user.roles.flatMap((role) => {
      console.log(role);
      return role.permissions.map((p) => p.code);
    });

    return requiredPermissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }
}
