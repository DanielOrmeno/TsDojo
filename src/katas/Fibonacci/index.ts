import { fiboIterative, fiboRecursive, fiboDynamic } from './solutions';
import { fibo0, fibo1, fibo2, fibo5 } from './testcases';
import { description } from './description';
import { IKata } from '@/classes/Kata';

const testCases = [ fibo0, fibo1, fibo2, fibo5 ];
const solutions = [ fiboIterative, fiboRecursive, fiboDynamic ];

export const Fibonacci: IKata = {
    description,
    testCases,
    solutions
}