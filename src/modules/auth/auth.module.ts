/*
 * @Author: Libra
 * @Date: 2025-01-02 17:02:32
 * @LastEditors: Libra
 * @Description:
 */

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CoreService } from '../core/core.service';
import { CoreModule } from '../core/core.module';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    CoreModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CoreModule],
      inject: [CoreService],
      useFactory: (coreService: CoreService) => ({
        secret: coreService.getJwtConfig().secret,
        signOptions: { expiresIn: coreService.getJwtConfig().expiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // 全局JWT认证守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
