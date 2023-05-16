import { DifficultyLevel, Player } from "@tictac/domain";

export interface SettingsState {
    multiplayer: boolean
    difficultyLevel: DifficultyLevel
    player: Player
}