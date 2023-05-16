import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../models/app-state";
import { GameState, Symbol } from "@tictac/domain";
import { useInjection } from "inversify-react";
import { GameBoard, TYPES } from "@tictac/application";

interface SquareProps {
    position: [number, number]
    value: Symbol
    enabled: boolean
    onClick: () => void
  }

function Square(props: SquareProps) {
    const gameState = useSelector<AppState, GameState>(state => state.game)
    const squareValue = useSelector<AppState, Symbol>(state => state.game.gameBoardState.positions[props.position[0]][props.position[1]] as Symbol)
     
    const [hovered, setHovered] = useState<boolean>(false);
  
    function handleHover() {
      if (!props.enabled) {
        return
      }
      setHovered(true);
    };
  
    function handleHoverOut() {
      setHovered(false);
    };
    function handleClick() {
      if (!props.enabled) {
        return
      }
      setHovered(false)
      props.onClick()
    }

  
    const bgColor = gameState?.currentPlayer?.symbol === Symbol.X ? "bg-blue-500" : "bg-red-500"
    let squareBgColor = "bg-gray-300"
    let squareFontColor = "text-black"
    if (squareValue === Symbol.X) {
      squareBgColor = "bg-blue-500"
      squareFontColor = "text-white"
    }
    if (squareValue === Symbol.O) {
      squareBgColor = "bg-red-500"
      squareFontColor = "text-white"
    }

  return (
    <div
    onClick={handleClick}
    className={`w-16 h-16 flex justify-self-center items-center justify-center text-6xl font-bold cursor-pointer ${
      hovered ? `${bgColor} text-white` : `${squareBgColor} ${squareFontColor}`
    }`}
    onMouseEnter={() => handleHover()}
    onMouseLeave={handleHoverOut}
  >
    {hovered && !squareValue ? gameState?.currentPlayer?.symbol : squareValue }
  </div>
  );
}

export default Square;