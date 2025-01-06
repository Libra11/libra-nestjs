/*
 * @Author: Libra
 * @Date: 2025-01-06 14:03:59
 * @LastEditors: Libra
 * @Description: redis 模块
 */
import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '../config/config.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.getRedisConfig().host,
            port: configService.getRedisConfig().port,
          },
          password: configService.getRedisConfig().password,
          ttl: configService.getRedisConfig().ttl,
        });

        return { store };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
