import { DifficultyLevel, Player } from '@tictac/domain'
export interface GameOptions {
  dimension: number,
  multiplayer: boolean
  difficultyLevel: DifficultyLevel
  player: Player
}
