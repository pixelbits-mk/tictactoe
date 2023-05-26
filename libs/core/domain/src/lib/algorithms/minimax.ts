import { GameOutcome, GameStatus, Move, SymbolMarker } from '../models'

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
  const winCombination = getWinCombination(board)
  if (winCombination) {
    const [row, cell] = winCombination[0]
    return board[row][cell] === SymbolMarker.X
        ? GameOutcome.X_WINS
        : GameOutcome.O_WINS
  }

  if (board.every((row) => row.every((cell) => cell))) {
    return GameOutcome.DRAW
  }

  return GameOutcome.IN_PROGRESS
}

export const getWinCombination = (board: string[][]): number[][] | null => {
  const dimensions = board.length;

  // Winning combinations for rows, columns, and diagonals
  const winCombinations: number[][] = [];

  // Rows
  for (let i = 0; i < dimensions; i++) {
    const rowCombination: number[] = [];
    for (let j = 0; j < dimensions; j++) {
      rowCombination.push(i * dimensions + j);
    }
    winCombinations.push(rowCombination);
  }

  // Columns
  for (let i = 0; i < dimensions; i++) {
    const colCombination: number[] = [];
    for (let j = 0; j < dimensions; j++) {
      colCombination.push(i + j * dimensions);
    }
    winCombinations.push(colCombination);
  }

  // Diagonal from top-left to bottom-right
  const diagonal1: number[] = [];
  for (let i = 0; i < dimensions; i++) {
    diagonal1.push(i * dimensions + i);
  }
  winCombinations.push(diagonal1);

  // Diagonal from top-right to bottom-left
  const diagonal2: number[] = [];
  for (let i = 0; i < dimensions; i++) {
    diagonal2.push((i + 1) * dimensions - (i + 1));
  }
  winCombinations.push(diagonal2);

  for (const combination of winCombinations) {
    const positions: number[][] = [];
    for (const pos of combination) {
      const [row, col] = [Math.floor(pos / dimensions), pos % dimensions];
      positions.push([row, col]);
    }

    const firstPositionValue = board[positions[0][0]][positions[0][1]];
    if (firstPositionValue && positions.every(([row, col]) => board[row][col] === firstPositionValue)) {
      return positions;
    }
  }

  return null;
};

/**
 * Evaluates the status of the game based on the current board state and the symbol of the current player.
 * @param {string[][]} board - The game board.
 * @param {SymbolMarker} symbol - The symbol of the current player.
 * @returns {GameStatus} The status of the game.
 */
export const evaluateStatus = (board: string[][], symbol: SymbolMarker) => {
  const otherSymbol =
    symbol === SymbolMarker.X ? SymbolMarker.O : SymbolMarker.X
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
  if (
    symbol === SymbolMarker.O &&
    evaluateOutcome(board) === GameOutcome.O_WINS
  ) {
    return true
  }
  if (
    symbol === SymbolMarker.X &&
    evaluateOutcome(board) === GameOutcome.X_WINS
  ) {
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
  if (playerWon(board, SymbolMarker.X) || playerWon(board, SymbolMarker.O)) {
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
  return board.every((row) => row.every((cell) => !cell))
}

/**
 * Checks if the board is filled (all cells are filled).
 * @param {string[][]} board - The game board.
 * @returns {boolean} True if the board is filled, false otherwise.
 */
export const boardFilled = (board: string[][]) => {
  if (board.every((row) => row.every((cell) => cell))) {
    return true
  }
  return false
}

/**
 * Implements the minimax algorithm to find the best move for a player.
 * @param {string[][]} board - The game board.
 * @param {SymbolMarker} player - The symbol of the current player.
 * @param {Object} options - Options for the game.
 * @param {SymbolMarker} options.humanPlayer - The symbol of the human player.
 * @param {SymbolMarker} options.aiPlayer - The symbol of the AI player.
 * @param {number} maxDepth - the Maximum depth to search for a win before returning a random position
 * @returns {Move} The best move for the player.
 */
export const minimax = (
  board: string[][],
  player: SymbolMarker,
  options: { humanPlayer: SymbolMarker; aiPlayer: SymbolMarker },
  depth = 0,
  maxDepth = 3
): Move => {
  if (playerWon(board, options.aiPlayer)) {
    return { score: 1, position: [], depth };
  }
  if (playerWon(board, options.humanPlayer)) {
    return { score: -1, position: [], depth };
  }
  if (playerDraw(board)) {
    return { score: 0, position: [], depth };
  }
  if (depth >= maxDepth) {
    return findRandomMove(board);
  }

  const moves = [];
  const n = board.length; // Size of the board

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!board[row][col]) {
        const newBoard = [...board.map((row) => [...row])];
        newBoard[row][col] = player;

        const move = minimax(
          newBoard,
          player === options.aiPlayer
            ? options.humanPlayer
            : options.aiPlayer,
          options,
          depth + 1,
          maxDepth
        );
        move.position = [row, col];
        moves.push(move);
      }
    }
  }

  if (depth === 0) {
    player === options.aiPlayer ? 
      moves.sort(moveComparator) : moves.sort(moveComparator) && moves.reverse()
      
  }

  const bestMove = player === options.aiPlayer
    ? moves.reduce((best, move) => (move.score > best.score ? move : best), { score: -Infinity, position: [], depth: -1 })
    : moves.reduce((best, move) => (move.score < best.score ? move : best), { score: Infinity, position: [], depth: -1 });

  return bestMove;
};

const moveComparator = (a: Move, b: Move): number => {
  if (a.score > b.score) {
    return -1; // Sort a before b
  } else if (a.score < b.score) {
    return 1; // Sort b before a
  } else {
    // Scores are equal, sort by depth
    if (a.depth < b.depth) {
      return -1; // Sort a before b
    } else if (a.depth > b.depth) {
      return 1; // Sort b before a
    } else {
      return 0; // Preserve the original order
    }
  }
};

  /**
   * Finds a random move on the board for the specified player.
   * @param {string[][]} board - The game board.
   * @returns {Move} The random move.
   * @throws {Error} When the board is full and no available moves.
   */
  function findRandomMove(board: string[][]): Move {
    const emptySpots: [number, number][] = []

    // Iterate through the board and collect the positions of empty spots
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === '') {
          emptySpots.push([row, col])
        }
      }
    }

    if (emptySpots.length === 0) {
      // Handle the case when the board is full
      throw new Error('The board is full. No available moves.')
    }

    // Generate a random index to select a random empty spot
    const randomIndex = Math.floor(Math.random() * emptySpots.length)
    const randomSpot = emptySpots[randomIndex]

    return {
      score: 0,
      position: randomSpot,
      depth: 0
    }
  }
