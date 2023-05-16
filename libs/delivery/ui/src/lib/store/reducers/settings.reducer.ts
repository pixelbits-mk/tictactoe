// counterReducer.js

import { GameState, GameStatus, GameBoardState, GameOutcome, DifficultyLevel } from "@tictac/domain";
import { Action } from "redux";
import { QUIT_GAME_SUCCESS, START_GAME, START_GAME_SUCCESS } from "../actions";


// Define the initial state
const initialState = {
    multiplayer: false,
    difficultyLevel: DifficultyLevel.MEDIUM,
    player: null
};
// Define the reducer function
export const settingsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                multiplayer: (action as any).options.multiplayer,
                player: (action as any).options.player
            }
        case QUIT_GAME_SUCCESS: 
            return initialState
        default:
            return state;
    }
};
