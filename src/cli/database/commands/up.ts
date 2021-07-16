import yargs = require('yargs')
import { DatabaseHelper } from 'src/cli/helpers'

export interface Arguments extends yargs.Arguments {
  to: string
  from: string
  migrations: string
}

function builder(yargs: yargs.Argv): yargs.Argv {
  return yargs
    .option('to', {
      alias: 't',
      describe: 'migrate to',
      type: 'string'
    })
    .option('from', {
      alias: 'f',
      describe: 'migrate from',
      type: 'string'
    })
    .option('migrations', {
      alias: 'mg',
      describe: 'run specific migrations (ignore order)',
      type: 'array'
    })
    .conflicts('migrations', ['to', 'from'])
}

function handler(argv: yargs.Arguments) {
  DatabaseHelper.runMigrations(argv as Arguments)
    .catch(err => console.error(err.message))
}

export default {
  builder: builder,
  handler: handler
}
