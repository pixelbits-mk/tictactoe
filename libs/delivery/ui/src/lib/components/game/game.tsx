import { GameState } from '@tictac/domain'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppState } from '../../models'
import Board from '../board/board'
import Header from '../header/header'
import Modal from '../modal/modal'
import Stats from '../stats/stats'

/* eslint-disable-next-line */
export interface GameProps {}

function Game(props: GameProps) {
  const navigate = useNavigate()
  const gameState = useSelector<AppState, GameState>((state) => state.game)
  useEffect(() => {
    if (!gameState.currentPlayer) {
      navigate('/menu')
    }
  })
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background:
          'linear-gradient(to bottom, rgba(208, 225, 255, 0.8), rgba(80, 166, 200, 0.3))',
      }}
    >
      <div className="flex flex-col relative z-50">
        <Header />
        <Board />
        <Stats />
        <Modal />
      </div>
      <div className="z-0  absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </div>
  )
}

export default Game
