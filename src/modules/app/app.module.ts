import { Module, ValidationPipe, forwardRef, INestApplication } from '@nestjs/common'
import { AuthModule, ConfigModule, DatabaseModule } from 'src/modules'

@Module({
  imports: [
    forwardRef(() => ConfigModule),
    forwardRef(() => DatabaseModule),
    forwardRef(() => AuthModule),
  ]
})
export class AppModule {
  static setUpApplication(app: INestApplication): INestApplication {
    AuthModule.setUpApplication(app)
    
    return app
      .useGlobalPipes(new ValidationPipe({ 
        transform: true, 
        disableErrorMessages: false 
      }))
  }
}