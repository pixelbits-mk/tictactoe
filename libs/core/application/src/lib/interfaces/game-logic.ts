import { DifficultyLevel, GameState, Move, Player, SymbolMarker } from '@tictac/domain'
import { GameOptions } from '../models/game-options'
import { DifficultyThresholds } from '../models'

export interface GameLogic {
  startNewGame(options: GameOptions): GameState
  makeMove(state: GameState, player: Player, position: number[]): GameState
  getWinPositions(board: string[][]): number[][] | null 
  shouldFindBestMove(
    difficultyLevel: DifficultyLevel,
    thresholds: DifficultyThresholds
  ) : boolean

  findBestMove (
    board: string[][],
    options: { humanPlayer: SymbolMarker; aiPlayer: SymbolMarker }
  ): Move

  findRandomMove(board: string[][]): Move
}
