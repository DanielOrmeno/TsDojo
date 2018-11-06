import { IRunner } from "./IRunner";
import { ISolution } from "@/classes/Solution";
import { ITestCase } from "@/classes/TestCase";
import chalk from "chalk";
import { IKata } from "@/classes/Kata";

export class KataDescriber implements IRunner {
    public Solutions: ISolution[];
    public TestCases: ITestCase[];
    public Description: string;

    constructor(kata: IKata) {
        this.Solutions = kata.solutions;
        this.TestCases = kata.testCases;
        this.Description = kata.description;
    }

    public RunAsync() {
        console.log(this.Description);
        console.log(`Test cases: ${chalk.cyanBright(`${this.TestCases.length}`)}`);
        console.log(`Solutions submitted: ${chalk.cyanBright(`${this.Solutions.length}`)}`);
    }
}