import { ITestCase } from "./TestCase";
import { ISolution } from "./Solution";

export interface IKata {
    name: string;
    description: string;
    testCases: ITestCase[];
    solutions: ISolution[];
}