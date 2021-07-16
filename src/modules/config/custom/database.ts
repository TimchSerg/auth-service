import { Mode } from '../utils/constants'
import { getEnv } from '../utils/common'

const DEFAULTS = {
  [Mode.PRODUCTION]: {
    // no default values for production
  },
  [Mode.DEVELOPMENT]: {
    host: 'localhost',
    port: '5432',
    username: 'authServ',
    password: 'authServ',
    database: 'authServ'
  },
  [Mode.TEST]: {
    host: 'localhost',
    port: '5432',
    username: 'test',
    password: 'test',
    database: 'authServ_test'
  }
}

export default (() => {
  const NODE_ENV = getEnv('NODE_ENV')
  const defaults = DEFAULTS[NODE_ENV]
  return {
    database: {
      dialect: 'postgres',
      host: getEnv('DATABASE_HOST', defaults.host),
      port: parseInt(getEnv('DATABASE_PORT', defaults.port)),
      username: getEnv('DATABASE_USERNAME', defaults.username),
      password: getEnv('DATABASE_PASSWORD', defaults.password),
      database: getEnv('DATABASE_NAME', defaults.database),
      logging: NODE_ENV === Mode.PRODUCTION
    }
  }
})
