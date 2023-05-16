import { Player } from "@tictac/domain";
import { useSelector } from "react-redux";
import { AppState } from "../../models/app-state";
 
function Turn() {
    const currentPlayer = useSelector<AppState, Player>(state => state.game.currentPlayer as Player)
    const playerName = currentPlayer ? currentPlayer.name : ''
    return (
      <div className="p-2 text-xl">
        Turn: {playerName}
      </div>
    )
}
export default Turn