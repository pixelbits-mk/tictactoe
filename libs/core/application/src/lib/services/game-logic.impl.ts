import {
  DifficultyLevel,
  GameOutcome,
  GameState,
  GameStatus,
  Move,
  Player,
  SymbolMarker,
  evaluateOutcome,
  evaluateStatus,
  getWinCombination,
  minimax,
  playerWon,
} from '@tictac/domain'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { GameBoard } from '../interfaces/game-board'
import { GameLogic } from '../interfaces/game-logic'
import { GameOptions } from '../models/game-options'
import TYPES from '../models/types'
import { DifficultyThresholds } from '../models'

/**
 * Implementation of the GameLogic interface for managing the Tic-Tac-Toe game logic.
 * Provides methods to start a new game, make moves, and assign symbols to players.
 */

@injectable()
export class GameLogicImpl implements GameLogic {
  static DIMENSION = 3
  static AI_PlAYER_NAME = 'AI Player'
  static SECOND_PLAYER_NAME = 'Player 2'

  /**
   * Constructs a new instance of the GameLogicImpl class.
   * @param {GameBoard} gameBoard - The game board.
   */
  constructor(@inject(TYPES.GameBoard) private gameBoard: GameBoard) {}

  /**
   * Starts a new game with the specified options.
   * @param {GameOptions} options - The game options.
   * @returns {GameState} The initial game state.
   */
  startNewGame(options: GameOptions): GameState {
    const player1 = { ...options.player }
    const player2 = (
      options.multiplayer
        ? { name: GameLogicImpl.SECOND_PLAYER_NAME }
        : { name: GameLogicImpl.AI_PlAYER_NAME }
    ) as Player

    this.assignSymbols(player1, player2)
    const gameBoardState = this.gameBoard.initialize({
      dimension: GameLogicImpl.DIMENSION,
    })
    const gameState: GameState = {
      players: [player1, player2],
      gameBoardState,
      currentPlayer: player1,
      status: GameStatus.IN_PROGRESS,
      outcome: GameOutcome.IN_PROGRESS,
      winner: null,
      done: false,
    }
    return gameState
  }

  /**
   * Makes a move on the game board.
   * @param {GameState} state - The current game state.
   * @param {Player} player - The player making the move.
   * @param {number[]} position - The position to place the symbol.
   * @returns {GameState} The updated game state after the move.
   */
  makeMove(state: GameState, player: Player, position: number[]): GameState {
    const gameBoardState = this.gameBoard.set(
      state.gameBoardState,
      position,
      player.symbol
    )
    const nextPlayer = state.players.find(
      (t) => t.symbol !== player.symbol
    ) as Player
    const gameStatus = evaluateStatus(
      gameBoardState.positions,
      state.players[0].symbol
    )
    return {
      ...state,
      gameBoardState,
      currentPlayer: nextPlayer,
      status: gameStatus,
      outcome: evaluateOutcome(gameBoardState.positions),
      winner: playerWon(gameBoardState.positions, player.symbol)
        ? player
        : null,
      done: [GameStatus.DRAW, GameStatus.LOSE, GameStatus.WIN].includes(
        gameStatus
      ),
    }
  }

  /**
   * Returns the winning positions on the tic-tac-toe board, if any.
   * The winning positions represent the row, column, or diagonal that forms a winning combination.
   *
   * @param board The tic-tac-toe board represented as a 2D array of strings.
   *              Each element represents the value at a specific cell on the board.
   *              An empty string represents an empty cell.
   * @return The winning positions as an array of arrays, where each inner array contains the row and column indices.
   *         Returns `null` if there are no winning combinations on the board.
   */
  getWinPositions(board: string[][]): number[][] | null {
    return getWinCombination(board)
  }
  /**
   * Determines whether to find the best move based on the difficulty level and thresholds.
   * @param {DifficultyLevel} difficultyLevel - The difficulty level.
   * @param {DifficultyThresholds} thresholds - The difficulty thresholds.
   * @returns {boolean} True if the best move should be found, false otherwise.
   */
  shouldFindBestMove(
    difficultyLevel: DifficultyLevel,
    thresholds: DifficultyThresholds
  ): boolean {
    const random = Math.random()
    if (difficultyLevel === DifficultyLevel.EASY) {
      if (random < thresholds.EASY) {
        return true
      }
    }
    if (difficultyLevel === DifficultyLevel.MEDIUM) {
      if (random < thresholds.MEDIUM) {
        return true
      }
    }
    if (difficultyLevel === DifficultyLevel.HARD) {
      if (random < thresholds.HARD) {
        return true
      }
    }
    return false
  }
  /**
   * Finds the best move for the AI player using the minimax algorithm.
   * @param {string[][]} board - The game board.
   * @param {Object} options - Options for the game.
   * @param {SymbolMarker} options.humanPlayer - The symbol of the human player.
   * @param {SymbolMarker} options.aiPlayer - The symbol of the AI player.
   * @returns {Move} The best move for the AI player.
   */
  findBestMove (
    board: string[][],
    options: { humanPlayer: SymbolMarker; aiPlayer: SymbolMarker }
  ): Move {
    const bestMove = minimax(board, options.aiPlayer, options)
    return bestMove
  }
  /**
   * Finds a random move on the board for the specified player.
   * @param {string[][]} board - The game board.
   * @returns {Move} The random move.
   * @throws {Error} When the board is full and no available moves.
   */
  findRandomMove(board: string[][]): Move {
    const emptySpots: [number, number][] = []

    // Iterate through the board and collect the positions of empty spots
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          emptySpots.push([row, col])
        }
      }
    }

    if (emptySpots.length === 0) {
      // Handle the case when the board is full
      throw new Error('The board is full. No available moves.')
    }

    // Generate a random index to select a random empty spot
    const randomIndex = Math.floor(Math.random() * emptySpots.length)
    const randomSpot = emptySpots[randomIndex]

    return {
      score: 0,
      position: randomSpot,
      depth: 0
    }
  }

  /**
   * Assigns symbols to the players (if not already assigned).
   * @param {Player} player1 - The first player.
   * @param {Player} player2 - The second player.
   */
  private assignSymbols(player1: Player, player2: Player) {
    const symbols = [SymbolMarker.X, SymbolMarker.O]
    if (player1.symbol) {
      player2.symbol = symbols.find((t) => t !== player1.symbol) as SymbolMarker
    } else {
      player1.symbol = symbols[0]
      player2.symbol = symbols[1]
    }
  }
}
