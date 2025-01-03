/*
 * @Author: Libra
 * @Date: 2025-01-02 17:10:29
 * @LastEditors: Libra
 * @Description: 认证控制器
 */
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorator/public.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginReqDto, LoginResDto } from './dto/login-dto';
import { ApiResponseDecorator } from '../../common/decorator/api-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '用户登录', description: '用户登录' })
  @ApiBody({ description: '用户登录', type: LoginReqDto })
  @ApiResponseDecorator(HttpStatus.OK, LoginResDto, '登录成功！')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
