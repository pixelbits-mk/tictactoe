import { GameBoard, TYPES } from '@tictac/application'
import {
  GameState,
  GameStatus,
  SymbolMarker,
  getWinCombination,
} from '@tictac/domain'
import { useInjection } from 'inversify-react'
import { useSelector } from 'react-redux'
import { AppState } from '../../models/app-state'
import { moveToSquare, store } from '../../store'
import Square, { SquareStatus } from '../square/square'
import { SettingsState } from '../../models'

function Board() {
  const gameBoard = useInjection<GameBoard>(TYPES.GameBoard)
  const gameState = useSelector<AppState, GameState>(
    (state: AppState) => state.game
  )
  const settings = useSelector<AppState, SettingsState>(
    (state: AppState) => state.settings
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
    let squareStatus = SquareStatus.NORMAL
    if (gameState.status === GameStatus.INITIAL) {
      return ''
    }
    if (gameState.done) {
      const winCombination =
        getWinCombination(gameState.gameBoardState.positions) || []
      squareStatus = winCombination.some(
        ([x, y]) => x === position[0] && y === position[1]
      )
        ? SquareStatus.HIGHLIGHT
        : SquareStatus.DIMMED
    }
    return (
      <Square
        key={position[0] + '_' + position[1]}
        enabled={isEnabled(position)}
        position={position}
        value={SymbolMarker.X}
        status={squareStatus}
        onClick={() => clickSquare(position)}
      />
    )
  }


  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className={`grid grid-cols-${settings.dimension} gap-6`}>
        {Array.from({ length: settings.dimension }, (_, row) =>
          Array.from({ length: settings.dimension }, (_, col) =>
            renderCell([row, col])
          )
        )}
      </div>
    </div>
  )
}

export default Board
