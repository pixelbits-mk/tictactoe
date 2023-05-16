import 'reflect-metadata';

import { GameState } from "@tictac/domain";
import { GameOptions } from "../models/game-options";
import { inject, injectable } from "inversify";

@injectable()
export class GameServiceImpl {
    constructor() {
    }
    initialize(options: GameOptions) {
        
    }
    
}