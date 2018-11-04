# Typescript Dojo

An extensible Typescript Code Kata runner, benchmarker and comparer.

## What is a Code Kata?
>A code kata is an exercise in programming which helps programmers hone their skills through practice and repetition.
>
>The term was probably first coined by Dave Thomas, co-author of the book The Pragmatic Programmer, in a bow to the Japanese concept of kata in the martial arts. As of October 2011, Dave Thomas has published 21 different katas.
>
> *from [Wikipedia](https://en.wikipedia.org/wiki/Kata_(programming))*


## Features
The app is composed of three main components.

* **Kata**: The problem to be solved. Includes solutions and test cases.
* **Task**: A Kata runner that either executes and/or benchmarks a solution, or a Kata runner that compares a variety of implementations of the same Kata.
* **Result**: A summary of the execution of each implementation for a given Kata.

## Kata
A kata is composed of a *Description* a set of *Implementations* (or solutions) and a set of *Test Cases*.

Katas can be found on the `src/katas/` directory and each Kata should export an object with all three componetns. For example

    // src/kata/Fibonacci/index.ts
    import { fiboIterative, fiboRecursive, fiboDynamic } from './solutions';
    import { fibo0, fibo1, fibo2, fibo5 } from './testcases';
    import { description } from './description';
    
    const testCases = [ fibo0, fibo1, fibo2, fibo5 ];
    const solutions = [ fiboIterative, fiboRecursive, fiboDynamic ];
    
    export const Fibonacci = {
        description,
        testCases,
        solutions
    }

### Tasks
#### Kata runner
The simples implementation, it runs all the available test cases against all the different implementations of a given Kata and it reports the passed and failed tests.

#### Kata Benchmarker
`Todo`
#### Kata Comparer
`Todo`

## Getting Started
Run the following commands to run the application.

    npm install
    npx webpack
    node /dist/app.js

### Dependencies
* [Node JS](https://nodejs.org/en/)
* [Chalk JS](https://github.com/chalk/chalk)
* [Inquirer](https://github.com/SBoudrias/Inquirer.js)


## Available Katas
* Fibonacci

### Add your own
