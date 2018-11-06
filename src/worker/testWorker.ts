import * as commander from 'commander';
import { KataFactory } from '@/classes/kataFactory';
import { timingSafeEqual } from 'crypto';

const appConfig = require('../../package.json');

commander
.version(appConfig.version, '-v, --version')
    .option('-k, --kata [name]')
    .option('-s, --solution [name]')
    .parse(process.argv);    
const results: any[] = [];
const {kata, solution} = commander;

if (!kata || !solution) {
    process.send({})
}

const factory = new KataFactory();
const testCases = factory.getTestCases(kata);
const task = factory.getSolution(kata, solution);

function assert(actual: any, expected: any, comparer: any) {
    return comparer(actual, expected);
}

function run() {
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const testResult = {
            test: testCase.Test,
            expected: testCase.Expected,
            passed: false,
            message: ''
        };
    
        try {
            const result = task.run(testCase.Test);
            const passed = assert(result, testCase.Expected, testCase.Comparer);
    
            testResult.passed = passed;
            testResult.message = `Test ${i + 1} ${passed ? 'passed!' : `failed. Expected ${testCase.Expected}, Actual ${result}`}`;
        } catch (error) {
            testResult.passed = false;
            testResult.message = `ERROR: ${error.message} for test case ${testCase.Test}`;
        }
    
        results.push(testResult);
    }
    
    process.send({ solution, author: task.author, results })
}

run();
