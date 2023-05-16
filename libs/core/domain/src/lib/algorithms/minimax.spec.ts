import { GameOutcome, Symbol } from '../models'
import { evaluateOutcome, findBestMove, playerDraw, playerWon } from './minimax'
describe('minimax', () => {
    describe('evaluateOutcome', () => {
        it('should evaluate as X win horizontal', () => {
            const board1 = [
                ['X', 'X', 'X'],
                ['O', 'O', 'X'],
                ['X', 'O', 'O']
            ]
            expect(evaluateOutcome(board1)).toEqual(GameOutcome.X_WINS)

            const board2 = [
                ['O', 'O', 'X'],
                ['X', 'X', 'X'],
                ['X', 'O', 'O']
            ]
            expect(evaluateOutcome(board2)).toEqual(GameOutcome.X_WINS)
            const board3 = [
                ['O', 'O', 'X'],
                ['X', 'O', 'O'],
                ['X', 'X', 'X']
            ]
            expect(evaluateOutcome(board3)).toEqual(GameOutcome.X_WINS)

        })
        it('should evaluate as X win vertical', () => {

            const board4 = [
                ['X', 'O', 'X'],
                ['X', 'O', 'O'],
                ['X', 'X', 'O']
            ]
            expect(evaluateOutcome(board4)).toEqual(GameOutcome.X_WINS)

            const board5 = [
                ['O', 'X', 'X'],
                ['O', 'X', 'O'],
                ['X', 'X', 'O']
            ]
            expect(evaluateOutcome(board5)).toEqual(GameOutcome.X_WINS)

            const board6 = [
                ['O', 'X', 'X'],
                ['O', 'O', 'X'],
                ['X', 'O', 'X']
            ]
            expect(evaluateOutcome(board6)).toEqual(GameOutcome.X_WINS)
        })
        it('should evaluate X win diagonal', () => {
            const board7 = [
                ['O', 'X', 'X'],
                ['O', 'X', 'O'],
                ['X', 'O', 'X']
            ]
            expect(evaluateOutcome(board7)).toEqual(GameOutcome.X_WINS)
            const board8 = [
                ['X', 'X', 'O'],
                ['O', 'X', 'O'],
                ['X', 'O', 'X']
            ]
            expect(evaluateOutcome(board8)).toEqual(GameOutcome.X_WINS)
        })

        it('should evaluate as O win horizontal', () => {
            const board1 = [
                ['O', 'O', 'O'],
                ['X', 'X', 'O'],
                ['O', 'X', 'X']
            ]
            expect(evaluateOutcome(board1)).toEqual(GameOutcome.O_WINS)

            const board2 = [
                ['X', 'X', 'O'],
                ['O', 'O', 'O'],
                ['O', 'X', 'X']
            ]
            expect(evaluateOutcome(board2)).toEqual(GameOutcome.O_WINS)
            const board3 = [
                ['X', 'X', 'O'],
                ['O', 'X', 'X'],
                ['O', 'O', 'O']
            ]
            expect(evaluateOutcome(board3)).toEqual(GameOutcome.O_WINS)

        })
        it('should evaluate as O win vertical', () => {

            const board4 = [
                ['O', 'X', 'O'],
                ['O', 'X', 'X'],
                ['O', 'O', 'X']
            ]
            expect(evaluateOutcome(board4)).toEqual(GameOutcome.O_WINS)

            const board5 = [
                ['X', 'O', 'O'],
                ['X', 'O', 'X'],
                ['O', 'O', 'X']
            ]
            expect(evaluateOutcome(board5)).toEqual(GameOutcome.O_WINS)

            const board6 = [
                ['X', 'O', 'O'],
                ['X', 'X', 'O'],
                ['O', 'X', 'O']
            ]
            expect(evaluateOutcome(board6)).toEqual(GameOutcome.O_WINS)
        })
        it('should evaluate O win diagonal', () => {
            const board7 = [
                ['X', 'O', 'O'],
                ['X', 'O', 'X'],
                ['O', 'X', 'O']
            ]
            expect(evaluateOutcome(board7)).toEqual(GameOutcome.O_WINS)
            const board8 = [
                ['O', 'O', 'X'],
                ['X', 'O', 'X'],
                ['O', 'X', 'O']
            ]
            expect(evaluateOutcome(board8)).toEqual(GameOutcome.O_WINS)
        })

        it('should evaluate to a draw', () => {
            const board9 = [
                ['X', 'O', 'O'],
                ['O', 'O', 'X'],
                ['X', 'X', 'O']
            ]
            expect(evaluateOutcome(board9)).toEqual(GameOutcome.DRAW)
            const board10 = [
                ['X', 'O', 'X'],
                ['X', 'O', 'X'],
                ['O', 'X', 'O']
            ]
            expect(evaluateOutcome(board10)).toEqual(GameOutcome.DRAW)
        })

        it('should evaluate to in progress', () => {
            const board9 = [
                ['X', 'O', ''],
                ['O', 'O', 'X'],
                ['X', 'X', 'O']
            ]
            expect(evaluateOutcome(board9)).toEqual(GameOutcome.IN_PROGRESS)
            const board10 = [
                ['X', 'O', 'X'],
                ['X', '', 'X'],
                ['O', 'X', 'O']
            ]
            expect(evaluateOutcome(board10)).toEqual(GameOutcome.IN_PROGRESS)
        })
    })
    describe('playerWon', () => {
        it('should evaluate player X won correctly', () => {
            const board1 = [
                ['X', 'X', 'X'],
                ['O', 'O', 'X'],
                ['X', 'O', 'O']
            ]
            expect(playerWon(board1, Symbol.X)).toBe(true)
            expect(playerWon(board1, Symbol.O)).toBe(false)
        })
        it('should evaluate player O won correctly', () => {
            const board1 = [
                ['O', 'X', 'X'],
                ['X', 'O', 'X'],
                ['X', 'O', 'O']
            ]
            expect(playerWon(board1, Symbol.O)).toBe(true)
            expect(playerWon(board1, Symbol.X)).toBe(false)
        })
    })
    describe('playerDraw', () => {
        it('should evaluate player draw correctly', () => {
            const board1 = [
                ['X', 'X', 'O'],
                ['O', 'O', 'X'],
                ['X', 'O', 'X']
            ]
            expect(playerWon(board1, Symbol.X)).toBe(false)
            expect(playerWon(board1, Symbol.O)).toBe(false)
            expect(playerDraw(board1)).toBe(true)
        })
    })
    describe('findBestMove', () => {
        it('should find the best move', () => {
            let board = [
                ['X', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
            let nextMove = findBestMove(board, { humanPlayer: Symbol.X, aiPlayer: Symbol.O})
            expect(nextMove).toEqual({ score: 0, position: [ 1, 1 ] })
            board = [
                ['X', '', ''],
                ['X', 'O', ''],
                ['', '', '']
            ]
            nextMove = findBestMove(board, { humanPlayer: Symbol.X, aiPlayer: Symbol.O})
            expect(nextMove).toEqual({ score: 0, position: [ 2, 0 ] })

            board = [
                ['X', '', 'X'],
                ['X', 'O', ''],
                ['O', '', '']
            ]
            nextMove = findBestMove(board, { humanPlayer: Symbol.X, aiPlayer: Symbol.O})
            expect(nextMove).toEqual({ score: 0, position: [ 0, 1 ] })

            board = [
                ['X', 'O', 'X'],
                ['X', 'O', ''],
                ['O', 'X', '']
            ]
            nextMove = findBestMove(board, { humanPlayer: Symbol.X, aiPlayer: Symbol.O})
            expect(nextMove).toEqual({ score: 0, position: [ 1, 2 ] })

            board = [
                ['X', 'O', 'X'],
                ['X', 'O', 'O'],
                ['O', 'X', 'X']
            ]
            nextMove = findBestMove(board, { humanPlayer: Symbol.X, aiPlayer: Symbol.O})
            expect(nextMove).toEqual({ score: 0 })

        })
    })
})