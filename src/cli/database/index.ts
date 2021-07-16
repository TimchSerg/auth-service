import yargs = require('yargs');
import * as commands from 'src/cli/database/commands'
import { Mode } from 'src/modules/config/utils/constants'

yargs
  .help()
  .version()
  .option('mode', {
    alias: 'm',
    describe: 'application mode',
    type: 'string',
    default: Mode.DEVELOPMENT,
    choices: [ Mode.DEVELOPMENT, Mode.TEST, Mode.PRODUCTION ]
  })
  .middleware((yargs) => {
    process.env.NODE_ENV = yargs.mode 
  })
  .command('create', 'create database', commands.create)
  .command('drop', 'drop database', commands.drop)
  .command('up', 'run database migrations', commands.up)
  .command('down', 'undo database migration', commands.down)
  .demandCommand()
  .help()
  .argv
