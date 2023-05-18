// counterReducer.js

import { routerReducer } from 'react-router-redux'
import { gameReducer } from './reducers/game.reducer'
import { settingsReducer } from './reducers/settings.reducer'
import { statsReducer } from './reducers/stats.reducer'
import { uiReducer } from './reducers/ui.reducer'

const reducer = {
  ui: uiReducer,
  game: gameReducer,
  settings: settingsReducer,
  stats: statsReducer,
  routing: routerReducer,
}

export default reducer
