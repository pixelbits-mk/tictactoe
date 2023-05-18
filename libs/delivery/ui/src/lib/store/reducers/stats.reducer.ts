// counterReducer.js

import { GameOutcome } from '@tictac/domain'
import { Action } from 'redux'
import { MAKE_MOVE_SUCCESS, QUIT_GAME_SUCCESS } from '../actions'

// Define the initial state
const initialState = {
  player1Wins: 0,
  playerDraws: 0,
  player2Wins: 0,
}
// Define the reducer function
export const statsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case MAKE_MOVE_SUCCESS: {
      const gameState = (action as any).state
      const player1Win =
        gameState.winner &&
        gameState.winner.symbol === gameState.players[0].symbol
          ? 1
          : 0
      const player2Win =
        gameState.winner &&
        gameState.winner.symbol === gameState.players[1].symbol
          ? 1
          : 0
      const playerDraw = gameState.outcome === GameOutcome.DRAW ? 1 : 0
      return {
        ...state,
        player1Wins: state.player1Wins + player1Win,
        player2Wins: state.player2Wins + player2Win,
        playerDraws: state.playerDraws + playerDraw,
      }
    }
    case QUIT_GAME_SUCCESS: {
      return initialState
    }
    default:
      return state
  }
}
