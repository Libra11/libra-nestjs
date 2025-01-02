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
import { CoreModule } from './modules/core/core.module';
import { CommonService } from './modules/core/common/common.service';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './modules/core/config/configs/winston.config';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  /**
   * 导入 CoreModule 后，CoreModule 中的 CommonModule、ConfigModule、DatabaseModule、LoggerModule 也会被导入
   * 这些模块中的服务和配置可以被 AppModule 及其子模块使用
   */
  imports: [
    UserModule,
    CoreModule,
    TestModule,
    AuthModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 模块类也可以注入提供者（例如，用于配置目的）：
  // 但是，由于 circular dependency ，模块类本身不能作为 providers 注入。
  constructor(private readonly commonService: CommonService) {}

  /**
   * forRoutes 可以指定中间件应用的路径(可以是通配符)和方法
   * forRoutes({
      path: 'ab*cd',
      method: RequestMethod.ALL,
    });

    forRoutes 可以制定 Controller
    forRoutes(CatsController);


    可以使用 exclude 排除某些路径
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
   */
  configure(consumer: MiddlewareConsumer) {
    // 安全中间件， 全局应用 forRoutes('*')
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
