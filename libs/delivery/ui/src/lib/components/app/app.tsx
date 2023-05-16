import 'reflect-metadata';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
//import { Router, Route, Routes } from 'react-router'


import GameMenu from '../menu/menu';
import TicTacToe from '../game/game';

import { container } from '@tictac/ioc'

import { Provider } from 'inversify-react';
import { Provider as ReactProvider, useSelector } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import browserHistory from '../../util/history';
import { store } from '../../store'

  
const history = syncHistoryWithStore(browserHistory, store)

export function App() {
    return (
        <Provider container={container} standalone={true}>
            <ReactProvider store={store}>
                <Router>
                    <Routes>
                        <Route path="/menu" element={<GameMenu />} />
                        <Route path="/game" element={<TicTacToe />} />
                        <Route path="*" element={<GameMenu />} />

                    </Routes>
                </Router>
            </ReactProvider>
        </Provider>

    )
}
export default App