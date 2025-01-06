/*
 * @Author: Libra
 * @Date: 2025-01-02 17:10:29
 * @LastEditors: Libra
 * @Description: 认证控制器
 */
import {
  Controller,
  Post,
  Request,
  Get,
  HttpStatus,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorator/public.decorator';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginReqDto, LoginResDto } from './dto/login-dto';
import { ApiResponseDecorator } from '../../common/decorator/api-response.decorator';
import { UserService } from '../user/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CaptchaService } from './services/captcha.service';
import { CaptchaResDto } from './dto/captcha.dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Get('captcha')
  @Public()
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponseDecorator(HttpStatus.OK, CaptchaResDto, '获取成功')
  async getCaptcha() {
    return this.captchaService.generate();
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginReqDto })
  @ApiResponseDecorator(HttpStatus.OK, LoginResDto, '登录成功')
  async login(@Body() loginDto: LoginReqDto) {
    // 验证验证码
    const validCaptcha = await this.captchaService.verify(
      loginDto.captchaId,
      loginDto.captchaCode,
    );

    if (!validCaptcha) {
      throw new UnauthorizedException('验证码错误或已过期');
    }

    return this.authService.login(loginDto);
  }

  @Get('profile')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '获取个人信息' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  @Public()
  @ApiOperation({ summary: '刷新访问令牌' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponseDecorator(HttpStatus.OK, LoginResDto, '刷新成功')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }
}
