/*
 * @Author: Libra
 * @Date: 2024-12-27 14:33:00
 * @LastEditors: Libra
 * @Description: 主文件
 */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { CustomValidationPipe } from './common/pipe/validation.pipe';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局验证管道
  app.useGlobalPipes(new CustomValidationPipe());
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
  // 使用 Winston 作为全局日志系统
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // 允许跨域
  app.enableCors(configService.getCorsConfig());
  // 设置swagger
  configService.setupSwagger(app);

  const commonConfig = configService.getCommonConfig();
  const port = commonConfig.port;

  await app.listen(port);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation is available at: http://localhost:${port}/api/docs`,
  );
}

bootstrap();
