/*
 * @Author: Libra
 * @Date: 2025-01-02 17:44:54
 * @LastEditors: Libra
 * @Description:
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
