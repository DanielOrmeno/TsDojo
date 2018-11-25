import * as commander from 'commander';
import { KataFactory } from '@/classes/kataFactory';
import { TestResult } from '@/classes/TestCase';

const appConfig = require('../../package.json');

commander
.version(appConfig.version, '-v, --version')
    .option('-k, --kata [name]')
    .option('-s, --solution [name]')
    .parse(process.argv);

const {kata, solution} = commander;

if (!kata || !solution) {
    process.send({})
}

const factory = new KataFactory();
const task = factory.getSolution(kata, solution);
const generator = factory.getTestCasesGenerator(kata)();

function run() {
    const results: TestResult[] = [];
    let count = 1;
    for (let test = generator.next(); !test.done; test = generator.next()) {
        const testResult = new TestResult(test.value, count++);

        try {
            const result = task.run(testResult.test);
            testResult.assert(result);
        } catch (error) {
            testResult.passed = false;
            testResult.message = `ERROR: ${error.message} for test case ${testResult.test}`;
        }

        results.push(testResult);
    }

    process.send({ solution, author: task.author, results })
}

run();