import chalk from 'chalk';
import { App } from '@/app';

try {
    const app = new App();
    Promise.resolve(app.RunAsync())
            .catch(e => { throw e });
} catch (error) {
    console.log(chalk.magentaBright(`Unexpected error: ${error.message}`));
}