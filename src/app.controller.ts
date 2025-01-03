/*
 * @Author: Libra
 * @Date: 2024-12-27 14:33:00
 * @LastEditors: Libra
 * @Description: 应用控制器
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World';
  }
}
