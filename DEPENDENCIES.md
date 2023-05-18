## Nx Workspace

Nx is a next generation build system with first class monorepo support and powerful integrations.

For the curious at heart, the following Nx commands have been run to create and scaffold the various projects used in this solution:

1. Create a blank Nx workspace as an integrated monorepo

```bash
npx create-nx-workspace --packageManager=yarn --ci=azure
```
options: 
- integrated monorepo
- react
- webpack
- SASS

2. Create the domain project as a JavaScript/Typescript library

```bash
npx nx g @nx/js:lib domain --publishable --importPath=@tictac/domain --directory core
```
options: 
- ts/jest

3. Create the application project as a JavaScript/Typescript library
```bash
npx nx g @nx/js:lib application --publishable --importPath=@tictac/application --directory core
```
options: 
- ts/jest

4. Create the "Inversion of Control" project as a JavaScript/Typescript library
```bash
npx nx g @nx/js:lib ioc --publishable --importPath=@tictac/ioc --directory infrastructure
```
options: 
- ts/jest

5. Add Tailwind CSS support 
```bash
npx nx g @nx/react:setup-tailwind --project=tictactoe
```

6. Add a ReactJS project as a publishable library 
```bash
npx nx g @nx/react:library ui --directory=delivery --importPath=@tictac/ui --publishable 
```
options
- jest/rollup

7. Add support for Inversify DI framework
```bash
yarn add -D inversify reflect-metadata
yarn add inversify-react
```

8. Add support for ReactJS routing
```bash
yarn add react-router-dom redux react-redux @reduxjs/toolkit redux-logger
yarn add react-router-redux @types/react-router-redux 
```