## Setup
npx create-nx-workspace --packageManager=yarn --ci=azure
- options: 
   - integrated monorepo
   - react
   - webpack
   - SASS

npx nx g @nx/js:lib domain --publishable --importPath=@tictac/domain --directory core
- options: 
   - ts/jest

npx nx g @nx/js:lib application --publishable --importPath=@tictac/application --directory core
- options: 
   - ts/jest

npx nx g @nx/js:lib ioc --publishable --importPath=@tictac/ioc --directory infrastructure
- options: 
   - ts/jest

npx nx g @nx/react:setup-tailwind --project=tictactoe

npx nx g @nx/react:library ui --directory=delivery --importPath=@tictac/ui --publishable 
- options
   - jest/rollup


yarn add react-router-dom redux react-redux @reduxjs/toolkit redux-logger
yarn add -D inversify reflect-metadata
yarn add inversify-react
yarn add react-router-redux @types/react-router-redux 
