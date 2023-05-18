import 'reflect-metadata'

import { GameBoardState } from '@tictac/domain'
import { injectable } from 'inversify'
import { GameBoard } from '../interfaces/game-board'
import { GameBoardOptions } from '../models/game-board-options'

/**
 * Implementation of the GameBoard interface for managing the Tic-Tac-Toe game board state.
 * Provides methods to initialize, get, and set positions on the game board.
 */

@injectable()
export class GameBoardImpl implements GameBoard {
  private initBoard(dimensions: number) {
    const positions = []
    for (let i = 0; i < dimensions; ++i) {
      const row = []
      for (let j = 0; j < dimensions; ++j) {
        row.push('')
      }
      positions.push(row)
    }
    return positions
  }

  /**
   * Initializes the game board with the specified dimensions.
   * @param options - The options for the game board.
   * @returns The initial state of the game board.
   */
  initialize(options: GameBoardOptions): GameBoardState {
    return {
      dimension: options.dimension,
      positions: this.initBoard(options.dimension),
    }
  }
  /**
   * Retrieves the symbol at the specified position on the game board.
   * @param state - The current state of the game board.
   * @param indices - The indices of the position to access.
   * @returns The symbol at the specified position.
   * @throws Error if the indices are out of range or invalid.
   */
  get(state: GameBoardState, indices: number[]): string {
    if (indices.length !== 2) {
      throw new Error('Expected two indices to access a 2D board')
    }
    if (indices[0] < 0 || indices[0] >= state.dimension) {
      throw new Error('Indices[0] is out of range')
    }
    if (indices[1] < 0 || indices[1] >= state.dimension) {
      throw new Error('Indices[1] is out of range')
    }
    return state.positions[indices[0]][indices[1]]
  }

  /**
   * Sets the symbol at the specified position on the game board.
   * @param state - The current state of the game board.
   * @param indices - The indices of the position to set.
   * @param symbol - The symbol to set at the position.
   * @returns The updated state of the game board.
   * @throws Error if the indices are out of range, invalid, or the position is already occupied.
   */
  set(
    state: GameBoardState,
    indices: number[],
    symbol: string
  ): GameBoardState {
    if (symbol.trim() === '') {
      throw new Error('Cannot set an empty symbol on the board')
    }
    if (indices.length !== 2) {
      throw new Error('Expected two indices to access a 2D board')
    }
    if (indices[0] < 0 || indices[0] >= state.dimension) {
      throw new Error('Indices[0] is out of range')
    }
    if (indices[1] < 0 || indices[1] >= state.dimension) {
      throw new Error('Indices[1] is out of range')
    }
    if (state.positions[indices[0]][indices[1]] !== '') {
      throw new Error(
        `Cannot overwrite symbol at position [${(indices[0], indices[1])}]`
      )
    }
    const dimension = state.dimension
    const positions = [...state.positions.map((t) => [...t])]
    positions[indices[0]][indices[1]] = symbol
    return {
      dimension,
      positions,
    }
  }
}
