import { GameOutcome, GameStatus, SymbolMarker } from '../models'
import { boardEmpty, boardFilled, evaluateOutcome, evaluateStatus, getWinCombination, minimax, playerDraw, playerWon } from './minimax'
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
    describe('evaluateStatus', () => {
        it('should evaluate to DRAW', () => {
            const board = [
                ["X", "O", "X"],
                ["O", "X", "O"],
                ["O", "X", "O"]
            ]
            expect(evaluateStatus(board, SymbolMarker.O)).toEqual(GameStatus.DRAW)
        })
        it('should evaluate to a WIN from the perspective of player X', () => {
            const board = [
                ["X", "O", "X"],
                ["O", "X", "O"],
                ["X", "O", "O"]
            ]
            expect(evaluateStatus(board, SymbolMarker.X)).toEqual(GameStatus.WIN)
            expect(evaluateStatus(board, SymbolMarker.O)).toEqual(GameStatus.LOSE)
        })
        it('should evaluate to a LOSE from the perspective of player O', () => {
            const board = [
                ["X", "O", "X"],
                ["O", "X", "O"],
                ["X", "O", "O"]
            ]
            expect(evaluateStatus(board, SymbolMarker.O)).toEqual(GameStatus.LOSE)
            expect(evaluateStatus(board, SymbolMarker.X)).toEqual(GameStatus.WIN)
        })

        it('should evaluate to IN_PROGRESS', () => {
            const board = [
                ["X", "O", "X"],
                ["O", "", "O"],
                ["X", "O", ""]
            ]
            expect(evaluateStatus(board, SymbolMarker.X)).toEqual(GameStatus.IN_PROGRESS)
            expect(evaluateStatus(board, SymbolMarker.O)).toEqual(GameStatus.IN_PROGRESS)
        })
        it('should evaluateto INITIAL', () => {
            const board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
            expect(evaluateStatus(board, SymbolMarker.X)).toEqual(GameStatus.INITIAL)
            expect(evaluateStatus(board, SymbolMarker.O)).toEqual(GameStatus.INITIAL)
        })
    })
    describe('playerWon', () => {
        it('should evaluate player X won correctly', () => {
            const board1 = [
                ['X', 'X', 'X'],
                ['O', 'O', 'X'],
                ['X', 'O', 'O']
            ]
            expect(playerWon(board1, SymbolMarker.X)).toBe(true)
            expect(playerWon(board1, SymbolMarker.O)).toBe(false)
        })
        it('should evaluate player O won correctly', () => {
            const board1 = [
                ['O', 'X', 'X'],
                ['X', 'O', 'X'],
                ['X', 'O', 'O']
            ]
            expect(playerWon(board1, SymbolMarker.O)).toBe(true)
            expect(playerWon(board1, SymbolMarker.X)).toBe(false)
        })
    })
    describe('playerDraw', () => {
        it('should evaluate player draw correctly', () => {
            const board1 = [
                ['X', 'X', 'O'],
                ['O', 'O', 'X'],
                ['X', 'O', 'X']
            ]
            expect(playerWon(board1, SymbolMarker.X)).toBe(false)
            expect(playerWon(board1, SymbolMarker.O)).toBe(false)
            expect(playerDraw(board1)).toBe(true)
        })
    })
    describe('boardEmpty', () =>{
        it('should evaluate to true for empty board', () => {
            const board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
            expect(boardEmpty(board)).toEqual(true)
        })
        it('should evaluate to false for partially filled board', () => {
            const board = [
                ["X", "", ""],
                ["O", "O", ""],
                ["X", "", ""]
            ]
            expect(boardEmpty(board)).toEqual(false)
        })

    })
    describe('boardFilled', () =>{
        it('should evaluate to false for empty board', () => {
            const board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
            expect(boardFilled(board)).toEqual(false)
        })
        it('should evaluate to false for partially filled board', () => {
            const board = [
                ["X", "", ""],
                ["O", "O", ""],
                ["X", "", ""]
            ]
            expect(boardFilled(board)).toEqual(false)
        })

        it('should evaluate to true for fully filled board', () => {
            const board = [
                ["X", "X", "O"],
                ["O", "O", "X"],
                ["X", "X", "O"]
            ]
            expect(boardFilled(board)).toEqual(true)
        })
    })
    describe('getWinCombination', () => {
        it('should return null if no win combination', () => {
            const board = [
                ['X', 'O', 'X'],
                ['X', 'O', 'X'],
                ['O', 'X', 'O']
            ]
            expect(getWinCombination(board)).toEqual(null)
        })
        it('should return win combination horizontal', () => {
            const board = [
                ['X', 'X', 'X'],
                ['O', 'O', 'X'],
                ['X', 'X', 'O']
            ]
            expect(getWinCombination(board)).toEqual([
                [0,0],
                [0,1],
                [0,2]
            ])
        })
        it('should return win combination vertical', () => {
            const board = [
                ['X', 'O', 'O'],
                ['O', 'O', 'X'],
                ['X', 'O', 'X']
            ]
            expect(getWinCombination(board)).toEqual([
                [0,1],
                [1,1],
                [2,1]
            ])
        })
        it('should return win combination diagonal', () => {
            const board = [
                ['X', 'O', 'O'],
                ['O', 'X', 'O'],
                ['X', 'O', 'X']
            ]
            expect(getWinCombination(board)).toEqual([
                [0,0],
                [1,1],
                [2,2]
            ])
        })
    })

    describe('minimax', () => {
        it('should return the correct move for AI to maximize win', () => {
          const board = [
            ['X', 'X', ''],
            ['O', 'O', ''],
            ['', 'X', ''],
          ] as string[][];
          const options = {
            humanPlayer: SymbolMarker.X,
            aiPlayer: SymbolMarker.O
          };
          const expectedMove = { score: 1, position: [1, 2], depth: 1 };
          const actualMove = minimax(board, SymbolMarker.O, options);
          expect(actualMove).toEqual(expectedMove)
        });
      
        it('should return the correct move for human to minimize loss', () => {
          const board = [
            ['X', '', ''],
            ['O', 'O', ''],
            ['X', '', ''],
          ] as string[][];
          const options = {
            humanPlayer: SymbolMarker.X,
            aiPlayer: SymbolMarker.O
          };
          const expectedMove = { score: 0, position: [1, 2], depth: 5 };
          const actualMove = minimax(board, SymbolMarker.X, options);
          expect(actualMove).toEqual(expectedMove)
        });
      
        it('should return the correct move when it is a draw', () => {
          const board = [
            ['X', 'O', 'X'],
            ['O', 'X', 'O'],
            ['O', 'X', 'O'],
          ];
          const options = {
            humanPlayer: SymbolMarker.X,
            aiPlayer: SymbolMarker.O
          };
          const expectedMove = { score: 0, position: [], depth: 0 };
          const actualMove = minimax(board, SymbolMarker.O, options);
          expect(actualMove).toEqual(expectedMove)
        });
      

      });

})