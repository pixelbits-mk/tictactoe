import { DifficultyLevel, Player, SymbolMarker } from '@tictac/domain'
import { findRandomMove, shouldFindBestMove } from './game.thunk'

describe('Game Actions', () => {
  describe('shouldFindBestMove', () => {
    it('should return true or false based on difficulty level and random number for EASY level', () => {
      const difficultyLevel = DifficultyLevel.EASY
      const thresholds = {
        EASY: 0.5,
        MEDIUM: 0.7,
        HARD: 0.9,
      }

      // Mock Math.random() to always return 0.6
      jest.spyOn(Math, 'random').mockImplementation(() => 0.4)

      const result = shouldFindBestMove(difficultyLevel, thresholds)

      expect(result).toBe(true)

      // Restore Math.random() to its original implementation
      jest.mocked(Math.random).mockRestore()
    })

    it('should return true or false based on difficulty level and random number for MEDIUM level', () => {
      const difficultyLevel = DifficultyLevel.MEDIUM
      const thresholds = {
        EASY: 0.5,
        MEDIUM: 0.7,
        HARD: 0.9,
      }

      // Mock Math.random() to always return 0.8
      jest.spyOn(Math, 'random').mockImplementation(() => 0.6)

      const result = shouldFindBestMove(difficultyLevel, thresholds)

      expect(result).toBe(true)

      // Restore Math.random() to its original implementation
      jest.mocked(Math.random).mockRestore()
    })

    it('should return true or false based on difficulty level and random number for HARD level', () => {
      const difficultyLevel = DifficultyLevel.HARD
      const thresholds = {
        EASY: 0.5,
        MEDIUM: 0.7,
        HARD: 0.9,
      }

      // Mock Math.random() to always return 0.95
      jest.spyOn(Math, 'random').mockImplementation(() => 0.8)

      const result = shouldFindBestMove(difficultyLevel, thresholds)

      expect(result).toBe(true)

      // Restore Math.random() to its original implementation
      jest.mocked(Math.random).mockRestore()
    })
  })

  describe('findRandomMove', () => {
    it('should return a valid move when there are empty spots on the board', () => {
      const board = [
        ['', 'X', 'O'],
        ['', '', ''],
        ['O', '', 'X'],
      ]
      const player: Player = { symbol: SymbolMarker.X, name: 'Player 1' }

      const move = findRandomMove(board, player)

      expect(move.player).toBe(player)
      expect(move.position).toBeDefined()
      expect(board[move.position[0]][move.position[1]]).toBe('')
    })

    it('should throw an error when the board is full', () => {
      const board = [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['O', 'X', 'O'],
      ]
      const player: Player = { symbol: SymbolMarker.X, name: 'Player 1' }

      expect(() => {
        findRandomMove(board, player)
      }).toThrow('The board is full. No available moves.')
    })
  })
})
