export interface GameBoardState {
    dimension: number
    positions: string[][]
}

export interface Player {
    symbol: SymbolMarker
    name: string
}
export enum GameStatus {
    DRAW = 'DRAW', 
    LOSE = 'LOSE',
    WIN = 'WIN',
    IN_PROGRESS = 'IN_PROGRESS',
    INITIAL = 'INITIAL'
}

export enum SymbolMarker {
    X = 'X',
    O = 'O'
}

export interface GameState {
    status: GameStatus
    winner: Player | null
    players: Player[]
    currentPlayer: Player | null
    gameBoardState: GameBoardState
    outcome: GameOutcome
    done: boolean
}

export enum GameOutcome {
    X_WINS = 'X_WINS',
    O_WINS = 'O_WINS',
    DRAW = 'DRAW',
    IN_PROGRESS = 'IN_PROGRESS',
    INITIAL = 'INITIAL'
}

export enum DifficultyLevel {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD'
}

export interface Move {
    score: number,
    position: number[],
    depth: number
}