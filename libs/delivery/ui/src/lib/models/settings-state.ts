import { DifficultyLevel, Player } from '@tictac/domain'

export interface SettingsState {
  dimension: number
  multiplayer: boolean
  difficultyLevel: DifficultyLevel
  player: Player | null
}
