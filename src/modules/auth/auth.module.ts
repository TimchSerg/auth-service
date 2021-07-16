import { Module, INestApplication } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { AccountController } from './controllers';
import { AccountService } from './providers/services';
import { DomainExceptionsFilter } from 'src/modules/auth/filters'
import { SequelizeModule } from '@nestjs/sequelize'
import { AccountModel } from 'src/modules/database/models';
@Module({
  controllers: [AccountController],
  imports: [
    SequelizeModule.forFeature([
      AccountModel
    ])
  ],
  providers: [
    // { provide: 'AccountFactory', useClass: AccountFactoryImpl },
    AccountService
  ]
})
export class AuthModule {
  static setUpApplication(app: INestApplication): INestApplication {
    const { httpAdapter } = app.get(HttpAdapterHost);

    return app
      .useGlobalFilters(new DomainExceptionsFilter(httpAdapter))
  }
}