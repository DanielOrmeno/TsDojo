import { ITestCase } from "@/classes/TestCase";

const Expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Comparer = (a: number[], b: number[]) => a.join('') === b.join('');

export const t1: ITestCase = { Comparer, Test: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], Expected };
export const t2: ITestCase = { Comparer, Test: [0, 7, 10, 6, 9, 2, 3, 4, 1, 5, 8], Expected };
export const t3: ITestCase = { Comparer, Test: [10, 8, 5, 4, 1, 6, 2, 9, 3, 0, 7], Expected };
export const t4: ITestCase = { Comparer, Test: [2, 4, 5, 7, 3, 8, 0, 1, 6, 9, 10], Expected };
