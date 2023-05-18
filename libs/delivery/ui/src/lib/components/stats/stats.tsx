import { GameState, GameStatus } from '@tictac/domain'
import { useSelector } from 'react-redux'
import { AppState, SettingsState, StatsState } from '../../models'

function Stats() {
  const settings = useSelector<AppState, SettingsState>(
    (state: AppState) => state.settings
  )
  const stats = useSelector<AppState, StatsState>(
    (state: AppState) => state.stats
  )
  const gameState = useSelector<AppState, GameState>(
    (state: AppState) => state.game
  )
  const player2Name = settings.multiplayer ? 'Player' : 'Computer'
  if (gameState.status === GameStatus.INITIAL) {
    return <div></div>
  }

  return (
    <div className="bg-white rounded-md py-4 px-4 shadow-lg my-4 grid grid-cols-3 text-center items-center justify-between">
      <div className="flex flex-col">
        <div className="text-lg">Player ({gameState.players[0].symbol})</div>
        <div className="text-4xl font-bold">{stats.player1Wins}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">Tie</div>
        <div className="text-4xl font-bold">{stats.playerDraws}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">
          {player2Name} ({gameState.players[1].symbol})
        </div>
        <div className="text-4xl font-bold">{stats.player2Wins}</div>
      </div>
    </div>
  )
}
export default Stats
