import { ITestCase } from "@/classes/TestCase";

const Comparer = (a: number, b: number) => a === b;

export const fibo0: ITestCase = { Comparer, Test: 10, Expected: 55 }
export const fibo1: ITestCase = { Comparer, Test: 1, Expected: 1 }
export const fibo2: ITestCase = { Comparer, Test: 2, Expected: 1 }
export const fibo5: ITestCase = { Comparer, Test: 5, Expected: 5 }
// export const fibo6: ITestCase = { Comparer, Test: 100, Expected: 354224848179262000000 }