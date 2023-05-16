import { GameOptions } from "../models/game-options";

export interface GameService {
    initialize(options: GameOptions): void
}