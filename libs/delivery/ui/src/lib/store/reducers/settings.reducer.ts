// counterReducer.js

import { DifficultyLevel } from '@tictac/domain'
import { Action } from 'redux'
import { QUIT_GAME_SUCCESS, START_GAME } from '../actions'
import { SettingsState } from '../../models'

// Define the initial state
const initialState: SettingsState = {
  multiplayer: false,
  dimension: 3,
  difficultyLevel: DifficultyLevel.MEDIUM,
  player: null,
}
// Define the reducer function
export const settingsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        dimension: (action as any).options.dimension,
        multiplayer: (action as any).options.multiplayer,
        difficultyLevel: (action as any).options.difficultyLevel,
        player: (action as any).options.player,
      }
    case QUIT_GAME_SUCCESS:
      return initialState
    default:
      return state
  }
}
