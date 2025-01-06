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
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { PermissionGroupController } from './controllers/permission-group.controller';
import { PermissionGroupService } from './services/permission-group.service';
import { PermissionGroup } from './entities/permission-group.entity';
import { SeedService } from './services/seed.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getCommonConfig().jwt.secret,
      }),
    }),
    TypeOrmModule.forFeature([User, Role, Permission, PermissionGroup]),
  ],
  controllers: [
    AuthController,
    RoleController,
    PermissionController,
    PermissionGroupController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RoleService,
    PermissionService,
    PermissionGroupService,
    // 全局JWT认证守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SeedService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
