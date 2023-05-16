import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../models/app-state";
import { GameBoardState, GameState, GameStatus, Player, Symbol } from "@tictac/domain";
import Square from "../square/square";
import { useInjection } from "inversify-react";
import { GameBoard, GameLogic, TYPES } from "@tictac/application";
import { makeAutoMove, moveToSquare, store } from "../../store";
import { SettingsState } from "../../models";

function Board() {
  const gameBoard = useInjection<GameBoard>(TYPES.GameBoard)
  const settings = useSelector<AppState, SettingsState>(state =>state.settings)
  const gameState = useSelector<AppState, GameState>(state => state.game)
  function clickSquare(position: [number, number]): void {
    if (gameState.currentPlayer) {
        store.dispatch(moveToSquare({
           player: gameState.currentPlayer,
           position
        }))
    }
  }
  function isEnabled(position: number[]) {

    if ([GameStatus.DRAW, GameStatus.WIN, GameStatus.LOSE].includes(gameState.status)) {
      return false
    }
    
    if (gameBoard.get(gameState.gameBoardState, position)) {
      return false
    }
    return true
  }
  function renderCell(position: [number, number]) {
    if (gameState.status === GameStatus.INITIAL) {
      return ''
    }
    return (
      <Square enabled={isEnabled(position)} position={position} value={ Symbol.X } onClick={() => clickSquare(position)} />
    );
  
  };

  return (

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-3 gap-6">
          {renderCell([0, 0])}
          {renderCell([0, 1])}
          {renderCell([0, 2])}
          {renderCell([1, 0])}
          {renderCell([1, 1])}
          {renderCell([1, 2])}
          {renderCell([2, 0])}
          {renderCell([2, 1])}
          {renderCell([2, 2])}
        </div>
      </div>
    
  );
};

export default Board;


// import { MouseEvent, useEffect } from "react";

// import { startNewGame, store } from "../../store";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { GameBoardState } from "@tictac/domain";
// import Square from '../square/square'

// export function GameBoard() {
//   const { positions } = useSelector<any, GameBoardState>(state => state.game.gameBoardState)
//   console.log('POSITIONS', positions)
//   function handleSquareClick(row: number, column: number) {
//     console.log(row, column)
//   }
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-75"
//     style={{
//         background: "linear-gradient(to bottom, #a3bffa, #ab85d0)"
//       }}>
//       {/* <div className="bg-white rounded-lg shadow-lg p-8">
//         <div className="grid grid-cols-3 gap-6">
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
//             X
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
//             O
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
//             O
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
//             X
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
//             X
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
//             O
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
//             O
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
//             X
//           </div>
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
//             X
//           </div>
//         </div>
//       </div> */}

//       <div className="bg-white rounded-lg shadow-lg p-8">
//         <div className="grid grid-cols-3 gap-6">
//           {/* Empty cells */}
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//           <div className="w-16 h-16 flex items-center justify-center text-6xl font-bold bg-gray-300" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GameBoard;




{/* <div style="background: #a3bffa;" class="flex items-center justify-center min-h-screen bg-gray-300 bg-opacity-75"
style={{
    background: "linear-gradient(to bottom, #a3bffa, #ab85d0)"
  }}>
  <div class="flex flex-col">
    <div class="p-2 text-xl">
      Turn: Player X
    </div>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <div class="grid grid-cols-3 gap-6">
        <div class="w-16 h-16  justify-self-center flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
          X
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
          O
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
          O
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
          X
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
          X
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
          O
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
          O
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-red-500 text-white">
          X
        </div>
        <div class="w-16 h-16 justify-self-center  flex items-center justify-center text-6xl font-bold bg-blue-500 text-white">
          X
        </div>
      </div>
    </div> 
    <div class="bg-white rounded-md py-4 px-4 shadow-lg my-4 grid grid-cols-3 text-center items-center justify-between">
        <div class="flex flex-col">
            <div class="text-lg">Player (X)</div>
            <div class="text-4xl font-bold">5</div>
        </div>
        <div class="flex flex-col">
            <div class="text-lg">Tie</div>
            <div class="text-4xl font-bold">0</div>
        </div>
        <div class="flex flex-col">
            <div class="text-lg">Computer (O)</div>
            <div class="text-4xl font-bold">3</div>
        </div>
    </div> 
  </div>


</div> */}

