/*
 * @Author: Libra
 * @Date: 2025-01-02 17:02:20
 * @LastEditors: Libra
 * @Description:
 */

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginReqDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginReqDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new BadRequestException('用户名或密码错误');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    // 获取完整的用户信息(包括角色、权限等)
    const fullUser = await this.userService.findOne(user.id);

    // 移除敏感信息
    delete fullUser.password;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: fullUser,
    };
  }

  private async generateAccessToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.getCommonConfig().jwt.accessToken.expiresIn,
    });
  }

  private async generateRefreshToken(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn:
        this.configService.getCommonConfig().jwt.refreshToken.expiresIn,
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      // 验证刷新令牌
      const payload = await this.jwtService.verify(refreshToken);
      const user = await this.userService.findOne(payload.sub);

      // 生成新的访问令牌
      const accessToken = await this.generateAccessToken(user);

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
