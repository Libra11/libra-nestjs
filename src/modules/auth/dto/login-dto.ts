/*
 * @Author: Libra
 * @Date: 2025-01-03 10:53:06
 * @LastEditors: Libra
 * @Description: 登录DTO
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  password: string;

  @ApiProperty({ description: '验证码ID' })
  @IsNotEmpty({ message: '验证码ID不能为空' })
  @IsString()
  captchaId: string;

  @ApiProperty({ description: '验证码' })
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString()
  captchaCode: string;
}

export class LoginResDto {
  @ApiProperty({ description: '访问令牌' })
  access_token: string;

  @ApiProperty({ description: '刷新令牌' })
  refresh_token: string;
}
