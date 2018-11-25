import chalk from 'chalk';
import * as ora from 'ora';

import { ITestCase, TestResult } from '@/classes/TestCase';
import { ISolution } from '@/classes/Solution';
import { IRunner } from './IRunner';
import { IKata } from '@/classes/Kata';

const { fork } = require('child_process');

export class KataTestRunner implements IRunner {
    public Solutions: ISolution[];
    public TestCases: ITestCase[];
    private children: any[];
    private kata: string;
    private timeout = 5000;

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

            this.children.push({ name: sol.name, process: child, completed: false });
            this.withTimeout(sol, spinner);
        }
    }

    private OnChildEvent($event: any, spinner: any) {
        if(!$event || !$event.results) {
            return;
        }

        const child = this.children.find(c => c.name === $event.solution);
        child.completed = true;
        child.process.kill();

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

    private withTimeout(solution: ISolution, spinner: any) {
        setTimeout(() => {
            const result = this.children.find(c => c.name === solution.name);
            if (!result.completed) {
                const testCase = new TestResult(this.TestCases[0], 1);
                testCase.passed = false;
                testCase.message = `Unable to complete task ${solution.name}, test took too long, timed out after ${this.timeout}ms`;
                this.OnChildEvent({ solution: solution.name, results: [testCase], author: solution.author}, spinner);
            }
        }, this.timeout);
    }
}