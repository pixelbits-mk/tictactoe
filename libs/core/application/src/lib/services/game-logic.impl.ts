import 'reflect-metadata';
import { GameOutcome, GameState, GameStatus, Player, Symbol, evaluateOutcome, evaluateStatus, playerWon } from "@tictac/domain";
import { GameLogic } from "../interfaces/game-logic";
import { GameOptions } from "../models/game-options";
import { GameBoard } from "../interfaces/game-board";
import { inject, injectable } from "inversify";
import TYPES from '../models/types';

@injectable()
export class GameLogicImpl implements GameLogic {
    static DIMENSION = 3
    static AI_PlAYER_NAME = 'AI Player'
    static SECOND_PLAYER_NAME = 'Player 2'
    constructor(@inject(TYPES.GameBoard) private gameBoard: GameBoard) {

    }
    startNewGame(options: GameOptions): GameState {
        const player1 = { ...options.player }
        const player2 = (options.multiplayer ? 
            { name: GameLogicImpl.SECOND_PLAYER_NAME } :
            { name: GameLogicImpl.AI_PlAYER_NAME }) as Player

        this.assignSymbols(player1, player2)
        const gameBoardState = this.gameBoard.initialize({
            dimension: GameLogicImpl.DIMENSION
        })
        const gameState: GameState = {
            players: [
                player1,
                player2
            ],
            gameBoardState,
            currentPlayer: player1,
            status: GameStatus.IN_PROGRESS,
            outcome: GameOutcome.IN_PROGRESS,
            winner: null,
            done: false
        }
        return gameState
    }
    makeMove(state: GameState, player: Player, position: number[]): GameState {
        const gameBoardState = this.gameBoard.set(state.gameBoardState, position, player.symbol)
        const nextPlayer = state.players.find(t => t.symbol !== player.symbol) as Player
        const gameStatus = evaluateStatus(gameBoardState.positions, state.players[0].symbol)
        return {
            ...state,
            gameBoardState,
            currentPlayer: nextPlayer,
            status: gameStatus,
            outcome: evaluateOutcome(gameBoardState.positions),
            winner: playerWon(gameBoardState.positions, player.symbol) ? player : null,
            done: [GameStatus.DRAW, GameStatus.LOSE, GameStatus.WIN].includes(gameStatus)
        }
    }
    private assignSymbols(player1: Player, player2: Player) {

        const symbols = [
            Symbol.X,
            Symbol.O
        ]
        if (player1.symbol) {
            player2.symbol = symbols.find(t => t !== player1.symbol) as Symbol
        } else {
            player1.symbol = symbols[0]
            player2.symbol = symbols[1]
        } 
        
    }

}