import { Module, INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { SequelizeModule } from '@nestjs/sequelize'

import { DomainExceptionsFilter } from 'src/modules/auth/filters'
import * as controllers from './controllers'
import * as models from 'src/modules/database/models'
import * as factories from './providers/factories';
import * as services from './providers/services'
import * as repositories from './providers/repositories'
@Module({
  controllers: [
    controllers.AccountController
  ],
  imports: [
    SequelizeModule.forFeature([
      models.AccountModel
    ])
  ],
  providers: [
    { provide: 'AccountFactory', useClass: factories.AccountFactoryImpl },
    { provide: 'AccountRepository', useClass: repositories.AccountRepositoryImpl }, 
    services.AccountService
  ]
})
export class AuthModule {
  static setUpApplication(app: INestApplication): INestApplication {
    const { httpAdapter } = app.get(HttpAdapterHost);

    return app
      .useGlobalFilters(new DomainExceptionsFilter(httpAdapter))
  }
}