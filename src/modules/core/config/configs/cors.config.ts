/*
 * @Author: Libra
 * @Date: 2025-01-02 11:16:20
 * @LastEditors: Libra
 * @Description: 跨域配置
 */
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:5173', // 前端应用
      'http://localhost:3001', // Grafana
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range', 'X-Total-Count'],
  credentials: true,
  maxAge: 3600,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
