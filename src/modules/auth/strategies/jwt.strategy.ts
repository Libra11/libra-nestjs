/*
 * @Author: Libra
 * @Date: 2025-01-02 17:32:58
 * @LastEditors: Libra
 * @Description:
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // 从请求头中提取JWT令牌,格式为Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 是否忽略令牌过期,false表示不忽略
      ignoreExpiration: false,
      // JWT密钥,从配置中获取
      secretOrKey: configService.getCommonConfig().jwt.secret,
    });
  }

  async validate(payload: any) {
    // TODO: 查询用户信息
    return { userId: payload.sub, username: payload.username };
  }
}
