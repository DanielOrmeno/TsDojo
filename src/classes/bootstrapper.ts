import * as inquirer from 'inquirer';
import chalk from 'chalk';

import { buildOptions } from './optionBuilder';
import { HandlerFactory } from './taskHandlerFactory';
import { Logo } from '../../assets/logo';

const appConfig = require('../../package.json');

export class App {
    private shouldExit = false;

    public async RunAsync() {
        while(!this.shouldExit) {
        
            this.printHeader();
    
            const input = await inquirer.prompt(buildOptions());
            await this.processInput(input);
            await this.confirmContinue();
        }
    }

    private async processInput(input: any) {
        const { task, kata } = input;
    
        console.log(`\n${chalk.cyanBright(task, kata)}\n`);
    
        const factory = new HandlerFactory();
        const handler = factory.getHandler(input)
        return handler.RunAsync();
    }

    private async confirmContinue() {
        const response: any = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: 'Want to continue (just hit enter for YES)?',
                default: true
            }
        ]);

        this.shouldExit = !response.continue;
    }

    private printHeader() {
        console.clear();
        console.log(chalk.gray(Logo));
        console.log(`\n${appConfig.description} - ${chalk.gray(`Version ${appConfig.version}\n\n`)}`);
    }
}
