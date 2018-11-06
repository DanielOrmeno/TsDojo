import * as ora from 'ora';

import { ITestCase } from '@/classes/TestCase';
import { ISolution } from '@/classes/Solution';
import { IRunner } from './IRunner';
import chalk from 'chalk';
import { IKata } from '@/classes/Kata';

const { fork } = require('child_process');

export class KataTestRunner implements IRunner {
    public Solutions: ISolution[];
    public TestCases: ITestCase[];
    private children: any[];
    private kata: string;

    constructor(kata: IKata) {
        this.Solutions = kata.solutions;
        this.TestCases = kata.testCases;
        this.kata = kata.name;
        this.children = [];
    }

    public RunAsync() {
        if (this.Solutions.length <= 0) {
            console.log(chalk.yellow('No solutions found for this Kata'));
        }

        const spinner = ora().start();
        for(let i = 0; i < this.Solutions.length; i++) {
            const sol = this.Solutions[i];

            const child = fork('dist/testWorker.js', ['-k', this.kata ,'-s', sol.name]);
            child.on('message', ($event: any) => this.OnChildEvent($event, spinner));

            this.children.push({ name: sol.name, child, completed: false });
        }
    }

    private OnChildEvent($event: any, spinner: any) {
        if(!$event || !$event.results) {
            return;
        }

        this.children.find(c => c.name === $event.solution).completed = true;

        spinner.clear();
        const allPassed = $event.results.every((t: any) => t.passed);
        console.log(chalk.cyanBright(`${$event.solution} ${allPassed ? '🚀' : '💩'}`), chalk.gray(`- by ${$event.author}`))
        
        $event.results.forEach((r: any) => {
            if (r.passed) {
                spinner.succeed(r.message);
            } else {
                spinner.fail(r.message);
            }
        });

        if (!this.children.every(c => c.completed)) {
            spinner.start();
        }
        console.log('\n');
    }
}