// counterReducer.js

import { GameState, GameStatus, GameBoardState, GameOutcome } from "@tictac/domain";
import { Action } from "redux";
import { START_GAME, START_GAME_SUCCESS } from "./actions";
import { gameReducer } from "./reducers/game.reducer";
import {  uiReducer } from './reducers/ui.reducer'
import { routerReducer } from 'react-router-redux'
import { settingsReducer } from "./reducers/settings.reducer";
import { statsReducer } from "./reducers/stats.reducer";



  const reducer = {
    ui: uiReducer,
    game: gameReducer,
    settings: settingsReducer,
    stats: statsReducer,
    routing: routerReducer
  }
  
  export default reducer;