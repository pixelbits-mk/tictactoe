import { GameBoardState } from "@tictac/domain";
import { GameBoardOptions } from "../models/game-board-options";

export interface GameBoard {
    initialize(options: GameBoardOptions): GameBoardState
    get(state: GameBoardState, indices: number[]): string
    set(state: GameBoardState, indices: number[], symbol: string): GameBoardState
}