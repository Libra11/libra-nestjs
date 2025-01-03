/*
 * @Author: Libra
 * @Date: 2025-01-03 10:53:06
 * @LastEditors: Libra
 * @Description: 登录DTO
 */
import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class LoginResDto {
  @ApiProperty({ description: '访问令牌' })
  access_token: string;
}
