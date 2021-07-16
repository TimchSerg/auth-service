import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import { defaults, get, defaultsDeep } from 'lodash'
import { parseMode, Mode } from '../utils/constants'
import { default as custom } from '../custom'
@Injectable()
export class ConfigService {

  private config: Map<string, any>
  
  constructor() {
    this.config = new Map<string, any>()
    defaults(this.config, process.env)
    this.loadEnv()
    this.loadEnv(this.getMode())
    this.loadCustom()
  }

  private getMode(): Mode {
    return parseMode(this.require('NODE_ENV'))
  }

  private loadEnv(name?: string) {
    const path = name === undefined ? '.env' : `.${name}.env`
    defaults(this.config, config({ path: path }).parsed)
  }

  private loadCustom() {
    custom.forEach((loader) => {
      defaultsDeep(this.config, loader())
    })
  }

  get<T>(name: string): T | undefined
  get<T>(name: string, defaultValue?: T): T {
    return get(this.config, name, defaultValue)
  }

  require<T>(name: string): T {
    const value = get(this.config, name)
    
    if (value === undefined) {
      throw new Error(`Required value '${name}' was not found`)
    }
    return value
  }
}
