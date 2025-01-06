/*
 * @Author: Libra
 * @Date: 2025-01-06 13:42:14
 * @LastEditors: Libra
 * @Description:
 */
import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { RedisService } from '../../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CaptchaService {
  constructor(private redisService: RedisService) {}

  async generate() {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      noise: 2, // 干扰线条数
      color: true,
      background: '#fff',
    });

    const id = uuidv4();
    // 将验证码存入Redis，设置5分钟过期
    await this.redisService.set(`captcha:${id}`, captcha.text.toLowerCase());

    return {
      id,
      image: captcha.data,
    };
  }

  async verify(id: string, code: string): Promise<boolean> {
    const key = `captcha:${id}`;
    const stored = await this.redisService.get(key);

    if (!stored) {
      return false;
    }

    // 验证后立即删除
    await this.redisService.del(key);
    return stored === code.toLowerCase();
  }
}
