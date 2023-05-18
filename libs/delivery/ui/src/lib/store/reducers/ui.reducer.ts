// counterReducer.js

import { Action } from 'redux'
import { QUIT_GAME_SUCCESS, START_GAME, START_GAME_SUCCESS } from '../actions'

// Define the initial state
const initialState = {
  loading: false,
}
// Define the reducer function
export const uiReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        loading: true,
      }
    case START_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case QUIT_GAME_SUCCESS:
      return initialState
    default:
      return state
  }
}
