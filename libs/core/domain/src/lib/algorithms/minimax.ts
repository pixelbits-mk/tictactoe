import { GameOutcome, GameStatus, Move, SymbolMarker } from "../models";

/**
 * The minimax algorithm is a decision-making algorithm used in game theory and AI that helps determine the best move for a player by
 * considering all possible future moves and their outcomes. At each turn, the AI player recursively explores the game tree to
 * find the optimal move that maximizes its chances of winning or minimizes the opponent's chances of winning. 
 * 
 * Sources: 
 *     https://www.neverstopbuilding.com/blog/minimax
 */

/**
 * Evaluates the outcome of the game based on the current board state.
 * @param {string[][]} board - The game board.
 * @returns {GameOutcome} The outcome of the game.
 */
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
      return board[Math.floor(a / 3)][a % 3] === SymbolMarker.X ? GameOutcome.X_WINS : GameOutcome.O_WINS;
    }
  }

  if (board.every(row => row.every(cell => cell))) {
    return GameOutcome.DRAW;
  }

  return GameOutcome.IN_PROGRESS;
}

/**
 * Evaluates the status of the game based on the current board state and the symbol of the current player.
 * @param {string[][]} board - The game board.
 * @param {SymbolMarker} symbol - The symbol of the current player.
 * @returns {GameStatus} The status of the game.
 */
export const evaluateStatus = (board: string[][], symbol: SymbolMarker) => {    
    const otherSymbol = symbol === SymbolMarker.X ? SymbolMarker.O : SymbolMarker.X
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

/**
 * Checks if a player has won the game.
 * @param {string[][]} board - The game board.
 * @param {SymbolMarker} symbol - The symbol of the player to check.
 * @returns {boolean} True if the player has won, false otherwise.
 */
export const playerWon = (board: string[][], symbol: SymbolMarker) => {
    if (symbol === SymbolMarker.O && evaluateOutcome(board) === GameOutcome.O_WINS) {
        return true
    }
    if (symbol === SymbolMarker.X && evaluateOutcome(board) === GameOutcome.X_WINS) {
        return true
    }
    return false
}

/**
 * Checks if the game ended in a draw.
 * @param {string[][]} board - The game board.
 * @returns {boolean} True if the game ended in a draw, false otherwise.
 */
export const playerDraw = (board: string[][]) => {
    if (!boardFilled(board)) {
        return false
    }
    if (playerWon(board, SymbolMarker.X) ||
        playerWon(board, SymbolMarker.O)) {
        return false
    }
    return true
}

/**
 * Checks if the board is empty (no filled cells).
 * @param {string[][]} board - The game board.
 * @returns {boolean} True if the board is empty, false otherwise.
 */
export const boardEmpty = (board: string[][]) => {
    return board.every(row => row.every(cell => !cell))
}


/**
 * Checks if the board is filled (all cells are filled).
 * @param {string[][]} board - The game board.
 * @returns {boolean} True if the board is filled, false otherwise.
 */
export const boardFilled = (board: string[][]) => {
    if (board.every(row => row.every(cell => cell))) {
        return true
    }
    return false
}

/**
 * Finds the best move for the AI player using the minimax algorithm.
 * @param {string[][]} board - The game board.
 * @param {Object} options - Options for the game.
 * @param {SymbolMarker} options.humanPlayer - The symbol of the human player.
 * @param {SymbolMarker} options.aiPlayer - The symbol of the AI player.
 * @returns {Move} The best move for the AI player.
 */
export const findBestMove = (board: string[][], options: { humanPlayer: SymbolMarker, aiPlayer: SymbolMarker}) => {
    const bestMove = minimax(board, options.aiPlayer, options)
    return bestMove
}

/**
 * Implements the minimax algorithm to find the best move for a player.
 * @param {string[][]} board - The game board.
 * @param {SymbolMarker} player - The symbol of the current player.
 * @param {Object} options - Options for the game.
 * @param {SymbolMarker} options.humanPlayer - The symbol of the human player.
 * @param {SymbolMarker} options.aiPlayer - The symbol of the AI player.
 * @returns {Move} The best move for the player.
 */
export const minimax = (board: string[][], player: SymbolMarker, options: { humanPlayer: SymbolMarker, aiPlayer: SymbolMarker }): Move => {
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
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
              bestScore = moves[i].score;
              bestMove = moves[i];
            }
        }
    } else {
        let bestScore = Infinity
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = moves[i]
              }
        }
    }

    return bestMove
}
