import { ISolution } from "@/classes/Solution";

function merge<T>(arr1: T[], arr2: T[], callback: any) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (callback(arr1[i], arr2[j])) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    
    if (i < arr1.length) {
        result = [...result, ...arr1.slice(i)];
    } else if (j < arr2.length) {
        result = [...result, ...arr2.slice(j)];
    }

    return result;
}

function descending (a: number, b: number) {
    return a <= b;
}

export const HighOrderFunctions: ISolution = {
    name: 'Using Higher order functions Ascending',
    author: 'Daniel Ormeno',
    runAsync: (arr: number[]) => {
        return arr.map(c => [c]).reduce((a, b) => merge(a, b, descending));
    }
}

export const Recursive: ISolution = {
    name: 'Recursive Approach Ascending',
    author: 'Daniel Ormeno',
    runAsync: async (arr: number[]) => {
        function sort(arr: number[], sortingFunc: any) : number[] {
            if (arr.length <= 1) {
                return arr;
            }
        
            const half = Math.floor(arr.length/ 2);
            const left = sort(arr.slice(0, half), sortingFunc);
            const right = sort(arr.slice(half), sortingFunc);
        
            return merge(left, right, sortingFunc);
        }

        return sort(arr, descending);
    }
}