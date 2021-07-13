import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app/app.module';
import { config } from 'dotenv'

// load values from .env variables
config()

NestFactory.create(AppModule)
  .then(app => app.listen(3000))
