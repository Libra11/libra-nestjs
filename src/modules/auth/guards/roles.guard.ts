/*
 * @Author: Libra
 * @Date: 2025-01-02 18:20:12
 * @LastEditors: Libra
 * @Description: 角色守卫
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
