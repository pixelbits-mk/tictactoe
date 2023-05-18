import { GameBoard, TYPES } from '@tictac/application'
import { GameState, GameStatus, SymbolMarker } from '@tictac/domain'
import { useInjection } from 'inversify-react'
import { useSelector } from 'react-redux'
import { AppState } from '../../models/app-state'
import { moveToSquare, store } from '../../store'
import Square from '../square/square'

function Board() {
  const gameBoard = useInjection<GameBoard>(TYPES.GameBoard)
  const gameState = useSelector<AppState, GameState>(
    (state: AppState) => state.game
  )
  function clickSquare(position: [number, number]): void {
    if (gameState.currentPlayer) {
      store.dispatch(
        moveToSquare({
          player: gameState.currentPlayer,
          position,
        })
      )
    }
  }
  function isEnabled(position: number[]) {
    // if the game is done, then disable
    if (gameState.done) {
      return false
    }

    // if the square already has a value then disable
    if (gameBoard.get(gameState.gameBoardState, position)) {
      return false
    }
    return true
  }
  function renderCell(position: [number, number]) {
    if (gameState.status === GameStatus.INITIAL) {
      return ''
    }
    return (
      <Square
        enabled={isEnabled(position)}
        position={position}
        value={SymbolMarker.X}
        onClick={() => clickSquare(position)}
      />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="grid grid-cols-3 gap-6">
        {renderCell([0, 0])}
        {renderCell([0, 1])}
        {renderCell([0, 2])}
        {renderCell([1, 0])}
        {renderCell([1, 1])}
        {renderCell([1, 2])}
        {renderCell([2, 0])}
        {renderCell([2, 1])}
        {renderCell([2, 2])}
      </div>
    </div>
  )
}

export default Board
