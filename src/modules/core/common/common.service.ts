/*
 * @Author: Libra
 * @Date: 2024-12-27 16:35:24
 * @LastEditors: Libra
 * @Description: 公共服务
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getCommon(): string {
    return 'Common';
  }
}
