import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(3, 20, { message: '用户名长度必须在3-20之间' })
  username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度必须在6-20之间' })
  password: string;

  @ApiProperty({ description: '昵称', required: false })
  @IsOptional()
  @Length(2, 20, { message: '昵称长度必须在2-20之间' })
  nickname?: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsOptional()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email?: string;

  @ApiProperty({ description: '头像', required: false })
  @IsOptional()
  avatar?: string;
}
