/*
 * @Author: Libra
 * @Date: 2024-12-27 14:33:00
 * @LastEditors: Libra
 * @Description: 主服务
 */
import { Injectable } from '@nestjs/common';
import { CommonService } from './modules/core/common/common.service';
@Injectable()
export class AppService {
  constructor(private readonly commonService: CommonService) {}
  getHello(): string {
    return this.commonService.getCommon();
  }
}
