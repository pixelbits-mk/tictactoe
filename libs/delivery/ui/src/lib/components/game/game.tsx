import Board from '../board/board';
import Turn from '../turn/turn';
import Stats from '../stats/stats'
import Modal from '../modal/modal'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../models';
import { GameState } from '@tictac/domain';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface GameProps { }

function Game(props: GameProps) {
  const navigate = useNavigate()
  const gameState = useSelector<AppState, GameState>(state => state.game)
  useEffect(() => {
    if (!gameState.currentPlayer) {
        navigate('/menu')
    }
  })
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, rgba(208, 225, 255, 0.8), rgba(180, 166, 200, 0.8))",
      }}
    >
      <div className="flex flex-col relative z-50">
        <Turn />
        <Board />
        <Stats />
        <Modal />
      </div>
        <div className="z-0  absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
    </div>


  );
}

export default Game;
