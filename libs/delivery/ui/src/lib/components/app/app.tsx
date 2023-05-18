import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import 'reflect-metadata'
import Game from '../game/game'
import Menu from '../menu/menu'

import { container } from '@tictac/ioc'

import { Provider as IocProvider } from 'inversify-react'
import { Provider as ReactProvider } from 'react-redux'
import { store } from '../../store'

export function App() {
  return (
    <IocProvider container={container} standalone={true}>
      <ReactProvider store={store}>
        <Router>
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Menu />} />
          </Routes>
        </Router>
      </ReactProvider>
    </IocProvider>
  )
}
export default App
