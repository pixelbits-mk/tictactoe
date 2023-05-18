import { Dispatch } from '@reduxjs/toolkit'
import {
  AppSettings,
  DifficultyThresholds,
  GameLogic,
  GameOptions,
  TYPES,
} from '@tictac/application'
import { DifficultyLevel, Player, findBestMove } from '@tictac/domain'
import { Container } from 'inversify'
import { AppState } from '../../models/app-state'
import { Move } from '../../models/moves'
import {
  makeMove,
  makeMoveSuccess,
  nextGame,
  nextGameSuccess,
  quitGame,
  quitGameSuccess,
  startGame,
  startGameSuccess,
} from '../actions'
import store from '../store'

/**
 * Action creator for starting a new game.
 * @param {GameOptions} options - The options for the new game.
 * @returns {Function} Thunk function that dispatches actions to start a new game.
 */
export function startNewGame(options: GameOptions) {
  return (dispatch: Dispatch, getState: any, container: Container) => {
    dispatch(startGame(options))
    const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
    const gameState = gameLogic.startNewGame(options)
    dispatch(startGameSuccess(gameState))
  }
}

/**
 * Action creator for making a move to a square.
 * @param {Move} move - The move to be made.
 * @returns {Function} Thunk function that dispatches actions to make a move.
 */
export function moveToSquare(move: Move) {
  return (
    dispatch: Dispatch,
    getState: () => AppState,
    container: Container
  ) => {
    dispatch(makeMove(move))
    const appState = getState()
    const settings = appState.settings
    const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
    const gameState = gameLogic.makeMove(
      appState.game,
      move.player,
      move.position
    )
    dispatch(makeMoveSuccess(gameState))

    /* AI player's turn, so fire auto move */
    if (
      !gameState.done &&
      !settings.multiplayer &&
      gameState.currentPlayer === gameState.players[1]
    ) {
      store.dispatch(makeAutoMove())
    }
  }
}

/**
 * Action creator for starting the next game.
 * @returns {Function} Thunk function that dispatches actions to start the next game.
 */
export function startNextGame() {
  return (
    dispatch: Dispatch,
    getState: () => AppState,
    container: Container
  ) => {
    dispatch(nextGame())
    const appState = getState()
    const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
    const gameState = gameLogic.startNewGame(appState.settings as GameOptions)
    dispatch(nextGameSuccess(gameState))
  }
}

/**
 * Action creator for going back to the menu.
 * @returns {Function} Thunk function that dispatches actions to go back to the menu.
 */
export function backToMenu() {
  return (
    dispatch: Dispatch,
    getState: () => AppState,
    container: Container
  ) => {
    dispatch(quitGame())
    dispatch(quitGameSuccess())
  }
}

/**
 * Thunk function for making an auto move by the AI player.
 * @returns {Function} Thunk function that dispatches actions to make an auto move.
 */
export function makeAutoMove() {
  return (
    dispatch: Dispatch,
    getState: () => AppState,
    container: Container
  ) => {
    const gameState = getState().game
    const settingsState = getState().settings
    const appSettings = container.get<AppSettings>(TYPES.AppSettings)
    const optimal = shouldFindBestMove(
      settingsState.difficultyLevel,
      appSettings.difficultyThresholds
    )
    const move = optimal
      ? findBestMove(gameState.gameBoardState.positions, {
          humanPlayer: gameState.players[0].symbol,
          aiPlayer: gameState.players[1].symbol,
        })
      : findRandomMove(gameState.gameBoardState.positions, gameState.players[1])

    console.log('Find Best Move', optimal)
    store.dispatch(
      moveToSquare({
        player: gameState.players[1],
        position: move.position as [number, number],
      })
    )
  }
}

/**
 * Determines whether to find the best move based on the difficulty level and thresholds.
 * @param {DifficultyLevel} difficultyLevel - The difficulty level.
 * @param {DifficultyThresholds} thresholds - The difficulty thresholds.
 * @returns {boolean} True if the best move should be found, false otherwise.
 */
export function shouldFindBestMove(
  difficultyLevel: DifficultyLevel,
  thresholds: DifficultyThresholds
) {
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
 * Finds a random move on the board for the specified player.
 * @param {string[][]} board - The game board.
 * @param {Player} player - The player making the move.
 * @returns {Move} The random move.
 * @throws {Error} When the board is full and no available moves.
 */
export function findRandomMove(board: string[][], player: Player): Move {
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
    player,
    position: randomSpot,
  }
}
