import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import Umzug from 'umzug';

export type UpOptions = Umzug.UpToOptions | Umzug.UpDownMigrationsOptions
export type DownOptions = Umzug.DownToOptions | Umzug.UpDownMigrationsOptions

@Injectable()
export class MigrationsService {

  private umzug: Umzug.Umzug

  constructor(
    private sequelize: Sequelize
  ) {
    this.sequelize = sequelize
    this.umzug = new Umzug({
      storage: "sequelize",
      storageOptions: {
        sequelize: this.sequelize
      },
      migrations: {
        params: [
          this.sequelize.getQueryInterface(),
          Sequelize
        ],
        path: path.join(__dirname, "../migrations"),
        pattern: /^\d+.migration.(js|ts)$/
      }
    })
  }

  async up(options?: UpOptions): Promise<void> {
    await this.umzug.up(options)
  }

  async down(options?: DownOptions): Promise<void> {
    await this.umzug.down(options)
  }
}
