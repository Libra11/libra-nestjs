/*
 * @Author: Libra
 * @Date: 2025-01-02 14:51:31
 * @LastEditors: Libra
 * @Description: swagger配置
 */

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpResponse } from '../../../../common/interface/http-response.interface';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('LibraDoc API')
    .setDescription('LibraDoc backend API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('documents', 'Document management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [HttpResponse],
  });

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Libra API Docs',
  });
};
