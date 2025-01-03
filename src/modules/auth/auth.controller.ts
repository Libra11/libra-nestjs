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
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorator/public.decorator';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginReqDto, LoginResDto } from './dto/login-dto';
import { ApiResponseDecorator } from '../../common/decorator/api-response.decorator';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: '用户注册' })
  @ApiResponseDecorator(HttpStatus.CREATED, User, '注册成功')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginReqDto })
  @ApiResponseDecorator(HttpStatus.OK, LoginResDto, '登录成功！')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '获取个人信息' })
  getProfile(@Request() req) {
    return req.user;
  }
}
