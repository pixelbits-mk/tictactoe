import { DifficultyLevel, GameOutcome, GameStatus, Symbol } from '@tictac/domain'
import { GameBoard } from '../interfaces/game-board'
import { GameLogicImpl } from './game-logic.impl'
describe('game logic', () => {
    let gameBoardMock: GameBoard
    let gameLogicImpl: GameLogicImpl
    beforeEach(() => {
        gameBoardMock = { initialize: jest.fn() } as unknown as GameBoard
        gameLogicImpl = new GameLogicImpl(gameBoardMock)
    })
    it ('should start new game', () => {
       const humanPlayer = { name: 'Player 1', symbol: Symbol.X }
       const aiPlayer = { name: GameLogicImpl.AI_PlAYER_NAME, symbol: Symbol.O }
       const gameState = gameLogicImpl.startNewGame({ player: humanPlayer, difficultyLevel: DifficultyLevel.MEDIUM, multiplayer: false})
       expect(gameState).toBeDefined()
       expect(gameState.currentPlayer).toEqual(humanPlayer)
       expect(gameState.players.length).toEqual(2)
       expect(gameState.players[0]).toEqual(humanPlayer)
       expect(gameState.players[1]).toEqual(aiPlayer)
       expect(gameState.status).toEqual(GameStatus.IN_PROGRESS)
       expect(gameState.outcome).toEqual(GameOutcome.IN_PROGRESS)
       expect(gameBoardMock.initialize).toHaveBeenCalledWith({ dimension: GameLogicImpl.DIMENSION })

    })
    
})