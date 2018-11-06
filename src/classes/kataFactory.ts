import { Katas } from '@/katas';

export class KataFactory {
    private katas: any = Katas;

    public getKata(kata: string) {
        return this.katas[kata];
    }
}