import { Module } from '@nestjs/common'
import { AccountController } from './controllers';
import { AccountService } from './providers/services';
@Module({
  controllers: [AccountController],
  imports: [],
  providers: [AccountService]
})
export class AuthModule {}