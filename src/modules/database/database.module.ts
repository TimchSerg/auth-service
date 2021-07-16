import { Module } from '@nestjs/common'
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
// import { ConfigService, ConfigModule } from '@nestjs/config'
import { ConfigModule } from 'src/modules/config/config.module';
import { ConfigService } from 'src/modules/config/providers/config.service';
import * as providers from './providers'
import * as models from './models'

async function sequelizeFactory (
  configService: ConfigService
): Promise<SequelizeModuleOptions> {

  const config = configService.get<SequelizeModuleOptions>('database');

  if (config === undefined) {
    throw new Error('Database configuration was not found')
  }

  config.models = [
    models.AccountModel,
  ]

  return config
}

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: sequelizeFactory
    })
  ],
  providers: [
    providers.MigrationsService
  ],
  exports: [
    providers.MigrationsService,
    SequelizeModule
  ]
})
export class DatabaseModule {}
