import { ISolution } from "@/classes/Solution";

export const fiboIterative: ISolution = {
    author: 'Daniel Ormeno',
    name: 'Iterative Approach',
    run: (n: number) => {
        if (n === 0) return 0;
        if (n === 1 || n === 2) return 1;

        const nums = [0, 1, 1];
        for (let i = 3; i <= n; i++) {
            nums[i] = nums[i - 1] + nums[i - 2];
        }

        return nums[n];
    },
}

export const fiboRecursive: ISolution = {
    author: 'Daniel Ormeno',
    name: 'Recursive Approach',
    run: (n: number) => {
        function fibo (n: any): number {
            if (n === 0) return 0;
            if (n === 1 || n === 2) return 1;
        
            return fibo(n - 2) + fibo(n - 1);
        }

        return fibo(n);
    }
}

export const fiboDynamic: ISolution = {
    author: 'Daniel Ormeno',
    name: 'Dynamic Programming',
    run: (n: number) => {
        function dynamic(n: any, cache: Map<number, number> = null): number {
            if (n <= 0) return 0;
            if (n === 1 || n === 2) return 1;
            
            if (!cache) {
                cache = new Map();
            }
        
            const left = cache.has(n - 2) ? cache.get(n - 2) : dynamic(n - 2, cache);
            const right = cache.has(n - 1) ? cache.get(n - 1) : dynamic(n - 1, cache);
            
            const fibN = left + right;
            cache.set(n, fibN);
            
            return fibN;
        }

        return dynamic(n);
    }
}