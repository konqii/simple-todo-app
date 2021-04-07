# TodoAppTesting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Test Setup with Jest

## Install needed Dependencies

```
npm install jest jest-preset-angular @types/jest --save-dev
```

### Jest Preset Angular
The jest-preset-angular package is the tool that makes it possible to run our Angular unit tests using Jest. It includes:
- ts-jest, a library that allows Jest to transpile our TypeScript code in-memory before running the tests.
- Snapshot serializers to enable snapshot testing for our Angular components.
- AST transformers to remove the CSS styles and inline the HTML templates of our components making them usable with JSDOM.

## Create jest.config.js at project root
```javascript
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
  coverageReporters: ['html', 'text'],
  coverageDirectory: 'coverage/my-app',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
```

## Update src/test.ts
Replace the content of src/test.ts with the following

```typescript
import 'jest-preset-angular';

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});
```
This code does two things:

1. Import the jest-preset-angular JavaScript module to set up our Angular testing environment.
2. Mock some properties and functions of the global window object to make sure our tests can run in a JSDOM environment.

## Update the content of tsconfi.spec.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jest", // 1
      "node"
    ],
    "esModuleInterop": true, // 2
    "emitDecoratorMetadata": true // 3
  },
  "files": [
    "src/test.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

1. Register Jest's type definitions files with the TypeScript compiler.
2. Enable the esModuleInterop option of the TypeScript compiler otherwise Jest will output a lot of warnings in the console.
3. Enable the emitDecoratorMetadata option of the TypeScript compiler otherwise Angular's Dependency Injection won't work with Jest.

## Remove Karma

### Remove Dependencies
```
npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter
```

### Remove configuration file
```
rm karma.conf.js
```

### Remove the test target inside angular.json
```json
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "main": "src/test.ts",
    "polyfills": "src/polyfills.ts",
    "tsConfig": "tsconfig.spec.json",
    "karmaConfig": "karma.conf.js",
    "assets": [
      "src/favicon.ico",
      "src/assets"
    ],
    "styles": [
      "src/styles.css"
    ],
    "scripts": []
  }
}
```

## Add test command to package.json

### with npx
```
test: npx jest
```

### with bin
```
test: ./node_modules/jest/bin/jest.js
```
