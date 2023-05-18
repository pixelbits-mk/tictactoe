import { Player } from "@tictac/domain";
import { useSelector } from "react-redux";
import { AppState } from "../../models/app-state";
import { SettingsState } from "../../models";
 
function Turn() {
    const settings = useSelector<AppState, SettingsState>((state: AppState) => state.settings)
    const currentPlayer = useSelector<AppState, Player>((state: AppState)  => state.game.currentPlayer as Player)
    const playerName = currentPlayer ? currentPlayer.name : ''

    function getDifficultyLevel() {
      if (settings.multiplayer) {
        return ''
      }
      return (
        <div className="p-2 text-xl">
          Difficulty: {settings.difficultyLevel}
        </div>
      )
    }
    return (
      <div className="flex flex-row justify-between">
        <div className="p-2 text-xl">
          Turn: {playerName}
        </div>
        {getDifficultyLevel()}
      </div>
    )
}
export default Turn