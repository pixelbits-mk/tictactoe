import 'reflect-metadata';

import { GameBoardState } from "@tictac/domain";
import { GameBoard } from "../interfaces/game-board";
import { GameBoardOptions } from "../models/game-board-options";
import { injectable } from 'inversify'

@injectable()
export class GameBoardImpl implements GameBoard {
    private initBoard(dimensions: number) {
        const positions = []
        for (let i = 0; i < dimensions; ++i) {
            const row = []
            for (let j = 0; j < dimensions; ++j) {
                row.push('')
            }
            positions.push(row)
        }
        return positions
    }

    initialize(options: GameBoardOptions): GameBoardState {
        return {
            dimension: options.dimension,
            positions: this.initBoard(options.dimension)
        }
    }
    get(state: GameBoardState, indices: number[]): string {
        if (indices.length !== 2) {
            throw new Error('Expected two indices to access a 2D board')
        }
        if (indices[0] < 0 || indices[0] >= state.dimension) {
            throw new Error('Indices[0] is out of range')
        }
        if (indices[1] < 0 || indices[1] >= state.dimension) {
            throw new Error('Indices[1] is out of range')
        }
        return state.positions[indices[0]][indices[1]]
    }
    set(state: GameBoardState, indices: number[], symbol: string): GameBoardState {
        if (symbol.trim() === '') {
            throw new Error('Cannot set an empty symbol on the board')
        }
        if (indices.length !== 2) {
            throw new Error('Expected two indices to access a 2D board')
        }
        if (indices[0] < 0 || indices[0] >= state.dimension) {
            throw new Error('Indices[0] is out of range')
        }
        if (indices[1] < 0 || indices[1] >= state.dimension) {
            throw new Error('Indices[1] is out of range')
        }
        if (state.positions[indices[0]][indices[1]] !== '') {
            throw new Error(`Cannot overwrite symbol at position [${indices[0], indices[1]}]`)
        }
        const dimension = state.dimension
        const positions = [...state.positions.map(t => [...t])]
        positions[indices[0]][indices[1]] = symbol
        return {
            dimension,
            positions
        }
        
    }
}