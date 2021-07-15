import { Module, forwardRef } from '@nestjs/common'
import { AuthModule, ConfigModule } from 'src/modules'

@Module({
  imports: [
    forwardRef(() => ConfigModule),
    forwardRef(() => AuthModule),
  ]
})
export class AppModule {}