
import { Runner } from './constants';
import { KataDescriber } from '@/tasks/Describer';
import { KataTestRunner } from '@/tasks/KataTestRunner';

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