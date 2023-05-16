import { GameState, Player } from "@tictac/domain";
import { GameOptions } from "../models/game-options";

export interface GameLogic {
    startNewGame(options: GameOptions): GameState
    makeMove(state: GameState, player: Player, position: number[]): GameState
}