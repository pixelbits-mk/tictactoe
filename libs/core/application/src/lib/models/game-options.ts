import { DifficultyLevel, Player } from '@tictac/domain'
export interface GameOptions {
  multiplayer: boolean
  difficultyLevel: DifficultyLevel
  player: Player
}
