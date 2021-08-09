import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app/app.module';

NestFactory.create(AppModule)
  .then(app => AppModule.setUpApplication(app))
  .then(app => app.listen(4000))
  