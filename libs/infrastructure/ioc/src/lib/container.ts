import { Container } from 'inversify'
import 'reflect-metadata'

import {
  AppSettings,
  GameBoard,
  GameBoardImpl,
  GameLogic,
  GameLogicImpl,
  TYPES,
} from '@tictac/application'

export const container = new Container()
container.bind<GameLogic>(TYPES.GameLogic).to(GameLogicImpl)
container.bind<GameBoard>(TYPES.GameBoard).to(GameBoardImpl)
container.bind<AppSettings>(TYPES.AppSettings).toConstantValue({
  difficultyThresholds: {
    EASY: 0.6,
    MEDIUM: 0.75,
    HARD: 0.9,
  },
})
export default container
