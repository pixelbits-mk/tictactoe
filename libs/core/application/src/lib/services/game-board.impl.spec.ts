import { GameBoardImpl } from './game-board.impl'
describe('game-board', () => {
  const gameBoard = new GameBoardImpl()
  it('should be defined', () => {
    expect(gameBoard).toBeDefined()
  })
  it('should initialize board with a 3x3 dimension and empty values', () => {
    const state = gameBoard.initialize({ dimension: 3 })
    expect(state.dimension).toBe(3)
    expect(state.positions).toEqual([
        ['', '', ''],
        ['', '', ''],    
        ['', '', '']
    ])
  })
  it('should set a given symbol at the specified indices', () => {
    let state = gameBoard.initialize({ dimension: 3 })
    const symbols = ['1','2','3','4', '5','6','7', '8', '9']
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            gameBoard.set(state, [i, j], symbols[i * 3 + j])
        }
    }
    expect(state.positions).toEqual([
        ['1', '2', '3'],
        ['4', '5', '6'],    
        ['7', '8', '9']
    ])
  })
  it('should not allow an empty symbol to be set for any position', () => {
    const state = gameBoard.initialize({ dimension: 3 })
    expect(() => gameBoard.set(state, [0, 0], '')).toThrow('Cannot set an empty symbol on the board')
    expect(() => gameBoard.set(state, [0, 0], '  ')).toThrowError('Cannot set an empty symbol on the board')
  })
})