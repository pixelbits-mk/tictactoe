import { GameState } from "@tictac/domain";
import { SettingsState } from "./settings-state";
import { UiState } from "./ui-state";
import { StatsState } from "./stats-state";

export interface AppState {
    ui: UiState
    game: GameState
    settings: SettingsState
    stats: StatsState
}