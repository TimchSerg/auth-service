import { Module } from '@nestjs/common';
import { CatsController } from './controllers';
// import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [],
})
export class LearningModule {}