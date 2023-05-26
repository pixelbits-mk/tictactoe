import { GameOptions } from '@tictac/application'
import { container } from '@tictac/ioc'
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk'
import {
  startNewGame
} from './game.thunk'

const middlewares = [thunk.withExtraArgument(container)]
const mockStore = configureStore([...middlewares])

describe('Actions', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      settings: {
        multiplayer: false
      },
      game: {
        players: [{ symbol: 'X' }, { name: 'AI Player', symbol: 'O' }],
        gameBoardState: {
          dimension: 3,
          positions: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ],
        },
        currentPlayer: { symbol: 'X' },
        status: 'IN_PROGRESS',
        outcome: 'IN_PROGRESS',
        winner: null,
        done: false,
      }
    })
  })

  it('startNewGame should start a new game and dispatch startGameSuccess', () => {
    const options = {
      // Provide game options
      dimension: 3
    } as GameOptions
    store.dispatch(startNewGame(options))
    const actions = store.getActions()
    expect(actions).toEqual([
      { type: 'START_GAME', options },
      // Other actions expected to be dispatched
      {
        type: 'START_GAME_SUCCESS',
        state: {
          players: [{ symbol: 'X' }, { name: 'AI Player', symbol: 'O' }],
          gameBoardState: {
            dimension: 3,
            positions: [
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ],
          },
          currentPlayer: { symbol: 'X' },
          status: 'IN_PROGRESS',
          outcome: 'IN_PROGRESS',
          winner: null,
          done: false,
        },
      },
    ])
  })


})

