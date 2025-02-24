import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ShopGlobalMiddleware } from './app.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(ShopGlobalMiddleware).forRoutes("*")
  }
}
