import { IRunner } from "./IRunner";
import { ISolution } from "@/classes/Solution";
import { ITestCase } from "@/classes/TestCase";
import chalk from "chalk";

export class KataDescriber implements IRunner {
    public Solutions: ISolution[];
    public TestCases: ITestCase[];
    public Description: string;

    constructor(testcases: ITestCase[], solutions: ISolution[], desc: string) {
        this.Solutions = solutions;
        this.TestCases = testcases;
        this.Description = desc;
    }

    public RunAsync() {
        console.log(this.Description);
        console.log(`Test cases: ${chalk.cyanBright(`${this.TestCases.length}`)}`);
        console.log(`Solutions submitted: ${chalk.cyanBright(`${this.Solutions.length}`)}`);
    }
}