import chalk from 'chalk';
import * as commander from 'commander';
import { HandlerFactory } from '@/classes/taskHandlerFactory';

const appConfig = require('../../package.json');

commander
    .version(appConfig.version, '-v, --version')
    .option('-k, --kata [name]')
    .option('-t, --task [name]')
    .parse(process.argv);

console.log(chalk.redBright(commander.kata));

const {kata, task} = commander;

if (kata && task) {
    const factory = new HandlerFactory();
    const handler = factory.getHandler({ kata, task })
    handler.RunAsync();
}
