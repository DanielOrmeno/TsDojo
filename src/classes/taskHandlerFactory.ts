import { Runner } from './constants';
import { Katas } from '@/katas';
import { KataTestRunner } from '@/tasks/KataTestRunner';
import { IRunner } from '@/tasks/IRunner';
import { KataDescriber } from '@/tasks/Describer';

export class KataFactory {
    private katas: any = Katas;

    public getKata(kata: string) {
        return this.katas[kata];
    }
}

export class TaskFactory {
    private tasks: Map<Runner, any>;

    constructor() {
        this.tasks = new Map<Runner, any>();
        this.tasks.set(Runner.Describe, KataDescriber)
        this.tasks.set(Runner.Test, KataTestRunner);
    }

    public getTask(runner: Runner) {
        if (!this.tasks.has(runner)) {
            throw new Error(`Unable to resolve runner for key ${runner}`);
        }

        return this.tasks.get(runner)
    }
}

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
