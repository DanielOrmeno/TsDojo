export interface ITestCase {
    Test: any;
    Expected: any;
    Comparer: any;
}

export class TestResult {
    public test: any;
    public expected: any;
    public comparer: any;
    public passed: boolean;
    public message: string;
    private testNumber: number;

    constructor (testCase: ITestCase, testNumber: number) {
        this.testNumber = testNumber;
        this.test = testCase.Test;
        this.expected = testCase.Expected;
        this.comparer = testCase.Comparer;
        this.passed = false;
        this.message = '';
    }

    public assert (actual: any) {
        this.passed = this.comparer(actual, this.expected);
        this.message = `Test ${this.testNumber} ${this.passed ? 'passed!' : `failed. Expected ${this.expected}, Actual ${actual}`}`
    }
}
