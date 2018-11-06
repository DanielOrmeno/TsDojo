import { Katas } from '@/katas';
import { IKata } from './Kata';

export class KataFactory {
    private katas: any = Katas;

    public getKata(kata: string): IKata {
        return this.katas[kata];
    }

    public getSolution(kata: string, name: string) {
        const k = this.getKata(kata);
        const { solutions } = k;

        return solutions.find(s => s.name === name);
    }

    public getTestCases(kata: string) {
        const k = this.getKata(kata);

        return k.testCases;
    }
}