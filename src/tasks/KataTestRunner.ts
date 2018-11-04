import * as ora from 'ora';

import { ITestCase } from '@/classes/TestCase';
import { ISolution } from '@/classes/Solution';
import { IRunner } from './IRunner';
import chalk from 'chalk';

export class KataTestRunner implements IRunner {
    public Solutions: ISolution[];
    public TestCases: ITestCase[];

    constructor(testcases: ITestCase[], solutions: ISolution[]) {
        this.Solutions = solutions;
        this.TestCases = testcases;
    }

    public async RunAsync(): Promise<void> {
        if (this.Solutions.length <= 0) {
            console.log(chalk.yellow('No solutions found for this Kata'));
        }

        for(let i = 0; i < this.Solutions.length; i++) {
            const sol = this.Solutions[i];
            console.log(chalk.cyanBright(`Solution: ${sol.name}`), chalk.gray(`by ${sol.author}\n`));
            await this.testSolutionAsync(sol, this.TestCases);
            console.log('\n');
        }
    }

    private async testSolutionAsync(solution: ISolution, testCases: ITestCase[]) {
        for (let i = 0; i < this.TestCases.length; i++) {
            const testCase = this.TestCases[i];
            const spinner = ora(`Running test case ${testCase.Test} ...\n`).start();
            try {
                const result = await solution.runAsync(testCase.Test);
                const passed = this.assert(result, testCase.Expected, testCase.Comparer);

                if (passed) {
                    spinner.succeed(`Test ${i + 1} passed!`);
                } else {
                    spinner.fail(`Test ${i + 1} failed. Expected ${testCase.Expected}, Actual ${result}`);
                }
            } catch (error) {
                spinner.fail(`ERROR: ${error.message} for test case ${testCase.Test}`);
            }
        }
    }
 
    private assert(actual: any, expected: any, comparer: any) {
        return comparer(actual, expected);
    }
}