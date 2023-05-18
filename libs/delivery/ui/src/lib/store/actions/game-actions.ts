import { GameOptions } from '@tictac/application'
import { GameState } from '@tictac/domain'
import { Move } from '../../models/moves'

// Action Types
export const START_GAME = 'START_GAME'
export const START_GAME_SUCCESS = 'START_GAME_SUCCESS'
export const MAKE_MOVE = 'MAKE_MOVE'
export const MAKE_MOVE_SUCCESS = 'MAKE_MOVE_SUCCESS'
export const NEXT_GAME = 'NEXT_GAME'
export const NEXT_GAME_SUCCESS = 'NEXT_GAME_SUCCESS'
export const QUIT_GAME = 'QUIT_GAME'
export const QUIT_GAME_SUCCESS = 'QUIT_GAME_SUCCESS'

// Action Creators
export const startGame = (options: GameOptions) => {
  return {
    type: START_GAME,
    options,
  }
}

export const startGameSuccess = (gameState: GameState) => {
  return {
    type: START_GAME_SUCCESS,
    state: gameState,
  }
}

export const makeMove = (move: Move) => {
  return {
    type: MAKE_MOVE,
    move,
  }
}

export const makeMoveSuccess = (gameState: GameState) => {
  return {
    type: MAKE_MOVE_SUCCESS,
    state: gameState,
  }
}
export const nextGame = () => {
  return {
    type: NEXT_GAME,
  }
}

export const nextGameSuccess = (gameState: GameState) => {
  return {
    type: NEXT_GAME_SUCCESS,
    state: gameState,
  }
}

export const quitGame = () => {
  return {
    type: QUIT_GAME,
  }
}
export const quitGameSuccess = () => {
  return {
    type: QUIT_GAME_SUCCESS,
  }
}
