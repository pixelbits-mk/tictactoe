import {
  DifficultyLevel,
  GameBoardState,
  GameOutcome,
  GameState,
  GameStatus,
  SymbolMarker,
} from '@tictac/domain'
import { GameBoard } from '../interfaces/game-board'
import { GameLogicImpl } from './game-logic.impl'
describe('game logic', () => {
  let gameBoardMock: GameBoard
  let gameLogicImpl: GameLogicImpl
  beforeEach(() => {
    gameBoardMock = {
      initialize: jest.fn(),
      set: jest.fn(),
    } as unknown as GameBoard
    gameLogicImpl = new GameLogicImpl(gameBoardMock)
  })

  describe('new game', () => {
    it('should start new game', () => {
      const humanPlayer = { name: 'Player 1', symbol: SymbolMarker.X }
      const aiPlayer = {
        name: GameLogicImpl.AI_PlAYER_NAME,
        symbol: SymbolMarker.O,
      }
      const gameState = gameLogicImpl.startNewGame({
        player: humanPlayer,
        difficultyLevel: DifficultyLevel.MEDIUM,
        multiplayer: false,
      })
      expect(gameState).toBeDefined()
      expect(gameState.currentPlayer).toEqual(humanPlayer)
      expect(gameState.players.length).toEqual(2)
      expect(gameState.players[0]).toEqual(humanPlayer)
      expect(gameState.players[1]).toEqual(aiPlayer)
      expect(gameState.status).toEqual(GameStatus.IN_PROGRESS)
      expect(gameState.outcome).toEqual(GameOutcome.IN_PROGRESS)
      expect(gameBoardMock.initialize).toHaveBeenCalledWith({
        dimension: GameLogicImpl.DIMENSION,
      })
    })
  })
  describe('make move', () => {
    let state: GameState
    const player1 = { symbol: SymbolMarker.X, name: 'Player 1' }
    const player2 = { symbol: SymbolMarker.O, name: 'Player 2' }
    beforeEach(() => {
      state = {
        status: GameStatus.IN_PROGRESS,
        winner: null,
        players: [player1, player2],
        currentPlayer: player1,
        gameBoardState: {
          dimension: 3,
          positions: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        },
        outcome: GameOutcome.IN_PROGRESS,
        done: false,
      }
    })
    it('should make a move on the board and switch to the next player', () => {
      const mockBoardState = getMockBoardState(
        state.gameBoardState,
        [0, 0],
        'X'
      )
      jest.mocked(gameBoardMock.set).mockReturnValue(mockBoardState)
      const newState = gameLogicImpl.makeMove(state, player1, [0, 0])
      expect(gameBoardMock.set).toHaveBeenCalledWith(
        state.gameBoardState,
        [0, 0],
        player1.symbol
      )
      expect(newState).toEqual({
        status: 'IN_PROGRESS',
        winner: null,
        players: [
          { symbol: 'X', name: 'Player 1' },
          { symbol: 'O', name: 'Player 2' },
        ],
        currentPlayer: { symbol: 'O', name: 'Player 2' },
        gameBoardState: mockBoardState,
        outcome: 'IN_PROGRESS',
        done: false,
      })
    })
    it('should win the game for player 1', () => {
      state.gameBoardState.positions = [
        ['X', 'X', ''],
        ['', 'O', ''],
        ['O', 'O', 'X'],
      ]
      const mockBoardState = getMockBoardState(
        state.gameBoardState,
        [0, 2],
        'X'
      )
      jest.mocked(gameBoardMock.set).mockReturnValue(mockBoardState)

      const newState = gameLogicImpl.makeMove(state, player1, [0, 2])

      expect(gameBoardMock.set).toHaveBeenCalledWith(
        state.gameBoardState,
        [0, 2],
        player1.symbol
      )
      expect(newState).toEqual({
        status: 'WIN',
        winner: { symbol: 'X', name: 'Player 1' },
        players: [
          { symbol: 'X', name: 'Player 1' },
          { symbol: 'O', name: 'Player 2' },
        ],
        currentPlayer: { symbol: 'O', name: 'Player 2' },
        gameBoardState: { dimension: 3, positions: mockBoardState.positions },
        outcome: 'X_WINS',
        done: true,
      })
    })

    it('should lose the game for player 1', () => {
      state.gameBoardState.positions = [
        ['X', 'X', ''],
        ['X', 'O', ''],
        ['O', 'O', 'X'],
      ]

      const mockBoardState = getMockBoardState(
        state.gameBoardState,
        [0, 2],
        'O'
      )
      jest.mocked(gameBoardMock.set).mockReturnValue(mockBoardState)

      const newState = gameLogicImpl.makeMove(state, player2, [0, 2])

      expect(gameBoardMock.set).toHaveBeenCalledWith(
        state.gameBoardState,
        [0, 2],
        player2.symbol
      )
      expect(newState).toEqual({
        status: 'LOSE',
        winner: { symbol: 'O', name: 'Player 2' },
        players: [
          { symbol: 'X', name: 'Player 1' },
          { symbol: 'O', name: 'Player 2' },
        ],
        currentPlayer: { symbol: 'X', name: 'Player 1' },
        gameBoardState: { dimension: 3, positions: mockBoardState.positions },
        outcome: 'O_WINS',
        done: true,
      })
    })
    it('should end the game in a draw', () => {
      state.gameBoardState.positions = [
        ['O', 'X', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', ''],
      ]

      const mockBoardState = getMockBoardState(
        state.gameBoardState,
        [2, 2],
        'X'
      )
      jest.mocked(gameBoardMock.set).mockReturnValue(mockBoardState)

      const newState = gameLogicImpl.makeMove(state, player1, [2, 2])

      expect(gameBoardMock.set).toHaveBeenCalledWith(
        state.gameBoardState,
        [2, 2],
        player1.symbol
      )
      expect(newState).toEqual({
        status: 'DRAW',
        winner: null,
        players: [
          { symbol: 'X', name: 'Player 1' },
          { symbol: 'O', name: 'Player 2' },
        ],
        currentPlayer: { symbol: 'O', name: 'Player 2' },
        gameBoardState: { dimension: 3, positions: mockBoardState.positions },
        outcome: 'DRAW',
        done: true,
      })
    })
  })
})

export const getMockBoardState = (
  state: GameBoardState,
  position: number[],
  symbol: string
) => {
  const clonedState = {
    ...state,
    dimension: state.dimension,
    positions: state.positions.map((row) => row.map((col) => col)),
  }
  clonedState.positions[position[0]][position[1]] = symbol
  return clonedState
}
