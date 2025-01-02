/*
 * @Author: Libra
 * @Date: 2024-12-27 14:45:37
 * @LastEditors: Libra
 * @Description: 用户控制器
 */
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}
}
