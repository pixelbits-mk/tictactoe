import 'reflect-metadata';

import { GameLogic } from "@tictac/application";
import { createContext } from "react";

export interface Context {
    gameLogic: GameLogic | null
}

export const GameContext = createContext<Context>({ gameLogic: null })

