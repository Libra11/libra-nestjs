/*
 * @Author: Libra
 * @Date: 2025-01-02 17:15:57
 * @LastEditors: Libra
 * @Description: 本地认证守卫
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
