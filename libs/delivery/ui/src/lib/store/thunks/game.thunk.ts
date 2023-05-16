
import { Dispatch } from "@reduxjs/toolkit";
import { startGameSuccess, makeMove, makeMoveSuccess, startGame, nextGame, nextGameSuccess, quitGame, quitGameSuccess } from "../actions";
import { Container } from "inversify";
import { AppSettings, DifficultyThresholds, GameLogic, GameOptions, TYPES } from "@tictac/application";
import { push } from 'react-router-redux';
import { Move } from "../../models/moves";
import { AppState } from "../../models/app-state";
import store from "../store";
import { DifficultyLevel, findBestMove, Player, Symbol} from "@tictac/domain";


export function startNewGame(options: GameOptions) {
    //
    return (dispatch: Dispatch, getState: any, container: Container) => {
      dispatch(startGame(options))
      const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
      const gameState = gameLogic.startNewGame(options)
      dispatch(startGameSuccess(gameState))
    }
  }
export function moveToSquare(move: Move) {
    return (dispatch: Dispatch, getState: () => AppState, container: Container) => {
        dispatch(makeMove(move))
        const appState = getState()
        const settings = appState.settings
        const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
        const gameState = gameLogic.makeMove(appState.game, move.player, move.position)
        dispatch(makeMoveSuccess(gameState))

        /* AI player's turn, so fire auto move */
        if (!gameState.done && !settings.multiplayer && gameState.currentPlayer === gameState.players[1]) {
          store.dispatch(makeAutoMove())
        }
    }
}
export function startNextGame() {
  return (dispatch: Dispatch, getState: () => AppState, container: Container) => {
    dispatch(nextGame())
    const appState = getState()
    const gameLogic = container.get<GameLogic>(TYPES.GameLogic)
    const gameState = gameLogic.startNewGame(appState.settings)
    dispatch(nextGameSuccess(gameState))
  }
}
export function backToMenu() {
  return (dispatch: Dispatch, getState: () => AppState, container: Container) => {
    dispatch(quitGame())
    dispatch(quitGameSuccess())
  }
}

export function makeAutoMove() {
  return (dispatch: Dispatch, getState: () => AppState, container: Container) => {
    const gameState = getState().game
    const settingsState = getState().settings
    const appSettings = container.get<AppSettings>(TYPES.AppSettings)
    const optimal = shouldFindBestMove(settingsState.difficultyLevel, appSettings.difficultyThresholds)
    const move = optimal ? 
      findBestMove(gameState.gameBoardState.positions, {
        humanPlayer: gameState.players[0].symbol,
        aiPlayer: gameState.players[1].symbol
      }) : 
      findRandomMove(gameState.gameBoardState.positions, gameState.players[1])

    console.log('Find Best Move', optimal)
    store.dispatch(moveToSquare({ player: gameState.players[1], position: move.position as [number, number] }))
  }
}

export function shouldFindBestMove(difficultyLevel: DifficultyLevel, thresholds: DifficultyThresholds) {
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

export function findRandomMove(board: string[][], player: Player): Move {
  const emptySpots: [number, number][] = [];

  // Iterate through the board and collect the positions of empty spots
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === "") {
        emptySpots.push([row, col]);
      }
    }
  }

  if (emptySpots.length === 0) {
    // Handle the case when the board is full
    throw new Error("The board is full. No available moves.");
  }

  // Generate a random index to select a random empty spot
  const randomIndex = Math.floor(Math.random() * emptySpots.length);
  const randomSpot = emptySpots[randomIndex];

  return {
    player,
    position: randomSpot,
  };
}