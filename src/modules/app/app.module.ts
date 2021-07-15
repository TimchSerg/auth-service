import { Module, forwardRef } from '@nestjs/common'
import { AuthModule } from 'src/modules'

@Module({
  imports: [
    forwardRef(() => AuthModule),
  ]
})
export class AppModule {}