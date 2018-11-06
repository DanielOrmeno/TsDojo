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
        const { solutions, testCases, description } = this.kataFactory.getKata(kata);
        const runner = this.runnerFactory.getTask(task.toLowerCase());

        return new runner(testCases, solutions, description);
    }
}
