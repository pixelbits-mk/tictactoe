import { Player } from '@tictac/domain'

export interface Move {
  player: Player
  position: [number, number]
}
