import {HighOrderFunctions, Recursive } from './solutions';
import { t1, t2, t3, t4 } from './testcases';
import { description } from './description';
import { IKata } from '@/classes/Kata';

const solutions = [ Recursive, HighOrderFunctions ];
const testCases = [ t1, t2, t3, t4 ]

export const MergeSort: IKata = {
    description,
    testCases,
    solutions
};
