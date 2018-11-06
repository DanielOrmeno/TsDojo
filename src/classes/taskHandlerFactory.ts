import { IRunner } from '@/tasks/IRunner';
import { KataFactory } from './kataFactory';
import { TaskFactory } from './taskFactory';

export class HandlerFactory {
    private kataFactory: KataFactory;
    private runnerFactory: TaskFactory;

    constructor() {
        this.kataFactory = new KataFactory();
        this.runnerFactory = new TaskFactory();
    }

    public getHandler({ kata, task }: any): IRunner {
        const runner = this.runnerFactory.getTask(task.toLowerCase());
        const codeKata = this.kataFactory.getKata(kata);
        return new runner(codeKata);
    }
}
