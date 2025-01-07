/*
 * @Author: Libra
 * @Date: 2024-12-27 14:33:00
 * @LastEditors: Libra
 * @Description: 主模块
 */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { WinstonModule } from 'nest-winston';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { RedisModule } from './modules/redis/redis.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [
    // 配置模块必须在最前面
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 自定义配置模块
    ConfigModule,
    // 其他依赖配置的模块
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getWinstonConfig(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getDbConfig(),
    }),
    // 功能模块
    UserModule,
    TestModule,
    AuthModule,
    RedisModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
