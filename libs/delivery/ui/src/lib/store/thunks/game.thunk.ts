import { Dispatch } from '@reduxjs/toolkit'
import {
  AppSettings,
  GameLogic,
  GameOptions,
  TYPES
} from '@tictac/application'

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
    const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
    const appSettings = container.get<AppSettings>(TYPES.AppSettings)
    const optimal = gameLogic.shouldFindBestMove(
      settingsState.difficultyLevel,
      appSettings.difficultyThresholds
    )
    const move = optimal
      ? gameLogic.findBestMove(gameState.gameBoardState.positions, {
          humanPlayer: gameState.players[0].symbol,
          aiPlayer: gameState.players[1].symbol,
        })
      : gameLogic.findRandomMove(gameState.gameBoardState.positions)

    console.log('Find Best Move', optimal)
    store.dispatch(
      moveToSquare({
        player: gameState.players[1],
        position: move.position as [number, number],
      })
    )
  }
}

