import { GameBoard, GameLogic, AppSettings, TYPES } from '@tictac/application'
import { container } from './container'

describe('container', () => {
  it('should resolve services', () => {
    expect(container.get<GameBoard>(TYPES.GameBoard)).toBeDefined()
    expect(container.get<GameLogic>(TYPES.GameLogic)).toBeDefined()
    expect(container.get<AppSettings>(TYPES.AppSettings)).toBeDefined()
  })
})
