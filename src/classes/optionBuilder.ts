import { Katas } from '@/katas';
import { Runner, RunnerOption } from './constants';

const options = [{
    type: 'list',
    name: RunnerOption.Kata,
    message: 'Which Kata would you like to run?',
    choices: [] as any[]
  },
  {
    type: 'list',
    name: RunnerOption.Task,
    message: 'What would you like to do?',
    choices: Object.keys(Runner)
  }
];

export function buildOptions() {
    const kataOptions = Object.keys(Katas);
    options.find(o => o.name === RunnerOption.Kata).choices = kataOptions;

    return options;
}