import { fiboIterative, fiboRecursive, fiboDynamic } from './solutions';
import { fibo0, fibo1, fibo2, fibo3, fibo4 } from './testcases';
import { description } from './description';
import { IKata } from '@/classes/Kata';

const testCases = [ fibo0, fibo1, fibo2, fibo3, fibo4 ];
const solutions = [ fiboIterative, fiboRecursive, fiboDynamic ];
const name = 'Fibonacci';

export const Fibonacci: IKata = {
    name,
    description,
    testCases,
    solutions
}