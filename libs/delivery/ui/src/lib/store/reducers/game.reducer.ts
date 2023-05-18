import { GameOutcome, GameState, GameStatus } from '@tictac/domain'
import { Action } from 'redux'
import {
  MAKE_MOVE_SUCCESS,
  NEXT_GAME_SUCCESS,
  QUIT_GAME_SUCCESS,
  START_GAME,
  START_GAME_SUCCESS,
} from '../actions'

// Define the initial state
const initialState: GameState = {
  winner: null,
  players: [],
  currentPlayer: null,
  gameBoardState: {
    dimension: 0,
    positions: [],
  },
  status: GameStatus.INITIAL,
  outcome: GameOutcome.INITIAL,
  done: false,
}

// Define the reducer function
export const gameReducer = (
  state: GameState = initialState,
  action: Action
): GameState => {
  switch (action.type) {
    case START_GAME:
      return state

    case START_GAME_SUCCESS:
    case MAKE_MOVE_SUCCESS:
    case NEXT_GAME_SUCCESS:
      return {
        ...state,
        ...(action as unknown as { state: GameState }).state,
      }

    case QUIT_GAME_SUCCESS:
      return initialState

    default:
      return state
  }
}
