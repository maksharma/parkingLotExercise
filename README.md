Setting up environment:
- to set up the proper environemnt, run `./setup.sh`

Assumptions:
- parking slots are finite and within integer limits
- input is provided in a txt file with values seperated by a singular space
- empty lines are skipped in processing
- times are provided in seconds

Dev dependencies:
- `eslint` to lint the code
- `jest` framework to test

Global dependencies:
- `typescript` to be able to write typescript code
- `ts-node` to compile and execute typescript

Code structure:
- `src/index.ts` is the main file for the execution to start
- `src/utils` directory contains the common lib functions needed
- `src/types.ts` contains the custom type declarations used
- unit test files are named `*.spec.ts` for the corresponding file they test
- `testHelper` directory contains sample inputs to help with testing

To lint:
- run `npm run lint` to check for linting issues
- run `npm run lint-fix` to check and fix auto-fixable linting issues

To execute the code:
- run `npm run parking-lot` from the project root

To run tests:
- run `npm run test` from the project root

Test coverage:
```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |   97.73 |    86.27 |     100 |   97.54 |
 src              |   97.41 |    84.44 |     100 |    97.3 |
  entryHandler.ts |   94.87 |    90.91 |     100 |   94.74 | 38,52
  exitHandler.ts  |     100 |      100 |     100 |     100 |
  index.ts        |   98.08 |       80 |     100 |   97.92 | 29
 src/utils        |     100 |      100 |     100 |     100 |
  index.ts        |     100 |      100 |     100 |     100 |
------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       38 passed, 38 total
Snapshots:   0 total
Time:        2.503 s, estimated 3 s
```
