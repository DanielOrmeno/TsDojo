import { ITestCase } from "./TestCase";
import { ISolution } from "./Solution";

export interface IKata {
    description: string;
    testCases: ITestCase[];
    solutions: ISolution[];
}