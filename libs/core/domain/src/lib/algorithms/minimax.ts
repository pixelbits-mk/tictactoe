import { DifficultyLevel, GameOutcome, GameStatus, Symbol } from "../models";

export const evaluateOutcome = (board: string[][]) => {
  // Winning combinations
  const winCombinations: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[Math.floor(a / 3)][a % 3] &&
        board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
        board[Math.floor(b / 3)][b % 3] === board[Math.floor(c / 3)][c % 3]) {
      return board[Math.floor(a / 3)][a % 3] === Symbol.X ? GameOutcome.X_WINS : GameOutcome.O_WINS;
    }
  }

  if (board.every(row => row.every(cell => cell))) {
    return GameOutcome.DRAW;
  }

  return GameOutcome.IN_PROGRESS;
}
export const evaluateStatus = (board: string[][], symbol: Symbol) => {    
    const otherSymbol = symbol === Symbol.X ? Symbol.O : Symbol.X
    if (playerDraw(board)) {
        return GameStatus.DRAW
    }
    if (playerWon(board, symbol)) {
        return GameStatus.WIN
    }
    if (playerWon(board, otherSymbol)) {
        return GameStatus.LOSE
    }
    if (boardEmpty(board)) {
        return GameStatus.INITIAL
    }
    return GameStatus.IN_PROGRESS
}

export const playerWon = (board: string[][], symbol: Symbol) => {
    if (symbol === Symbol.O && evaluateOutcome(board) === GameOutcome.O_WINS) {
        return true
    }
    if (symbol === Symbol.X && evaluateOutcome(board) === GameOutcome.X_WINS) {
        return true
    }
    return false
}
export const playerDraw = (board: string[][]) => {
    if (!boardFilled(board)) {
        return false
    }
    if (playerWon(board, Symbol.X) ||
        playerWon(board, Symbol.O)) {
        return false
    }
    return true
}

export const boardEmpty = (board: string[][]) => {
    return board.every(row => row.every(cell => !cell))
}
export const boardFilled = (board: string[][]) => {
    if (board.every(row => row.every(cell => cell))) {
        return true
    }
    return false
}

export const findBestMove = (board: string[][], options: { humanPlayer: Symbol, aiPlayer: Symbol}) => {
    const bestMove = minimax(board, options.aiPlayer, options)
    return bestMove
}

export interface Move {
    score: number,
    position?: number[]
}

export const minimax = (board: string[][], player: Symbol, options: { humanPlayer: Symbol, aiPlayer: Symbol }): Move => {
    if (playerWon(board, options.aiPlayer)) {
        return { score: 1 }
    }
    if (playerWon(board, options.humanPlayer)) {
        return { score: -1 }
    }
    if (playerDraw(board)) {
        return { score: 0 }
    }

    const moves = []
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (!board[row][col]) {
                let move = {} as Move
                const newBoard = [...board.map(row => [...row])]; 
                newBoard[row][col] = player;

                if (player == options.aiPlayer){
                    move = minimax(newBoard, options.humanPlayer, options);
                    move.position = [row, col]
                }
                else{
                    move = minimax(newBoard, options.aiPlayer, options);
                    move.position = [row, col]
                }
                moves.push(move)
            }
        }
    }

    let bestMove: Move  = { score: -1 }
    if (player === options.aiPlayer) {
        let bestScore = -Infinity;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
              bestScore = moves[i].score;
              bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = moves[i]
              }
        }
    }

    return bestMove
}
