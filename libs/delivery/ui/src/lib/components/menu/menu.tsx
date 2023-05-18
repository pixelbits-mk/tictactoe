import { useState } from 'react'

import { DifficultyLevel, SymbolMarker } from '@tictac/domain'
import { useNavigate } from 'react-router'
import { startNewGame, store } from '../../store'

function Menu() {
  const navigate = useNavigate()
  const [symbol, setSymbol] = useState(SymbolMarker.X)
  const [multiplayer, setMultiplayer] = useState(false)
  const [difficultyLevel, setDifficultyLevel] = useState(DifficultyLevel.MEDIUM)
  const levels = [
    DifficultyLevel.EASY,
    DifficultyLevel.MEDIUM,
    DifficultyLevel.HARD,
  ]

  function start(): void {
    store.dispatch(
      startNewGame({
        multiplayer,
        difficultyLevel,
        player: { symbol, name: 'Player 1' },
      })
    )
    navigate('/game')
  }

  function handleSelectSymbol(symbol: SymbolMarker) {
    setSymbol(symbol)
  }

  function toggleMultiplayer(state: boolean) {
    setMultiplayer(!state)
  }
  function toggleDifficultyLevel(difficultyLevel: DifficultyLevel) {
    if (!multiplayer) {
      const currentLevelIndex = levels.indexOf(difficultyLevel)
      const nextIndex = (currentLevelIndex + 1) % levels.length
      setDifficultyLevel(levels[nextIndex])
    }
  }
  function renderDifficultyLevel() {
    return (
      <div
        className={`flex items-center justify-center text-2xl ${
          multiplayer ? 'text-gray-600' : 'text-white'
        }`}
      >
        Difficulty Level:
        <button
          onClick={() => toggleDifficultyLevel(difficultyLevel)}
          className={`rounded bg-gray-500 px-6 m-4 ${
            multiplayer ? 'bg-gray-800' : 'bg-gray-500'
          }`}
        >
          {difficultyLevel}
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="w-screen h-screen bg-gray-800 flex flex-col items-center justify-center">
        <div className="p-6 flex flex-row items-center justify-center text-7xl font-extrabold text-white">
          <span className="mx-3 text-red-500">Tic</span>
          <span className="mx-3 text-blue-500">Tac</span>
          <span className="mx-3 text-green-500">Toe</span>
        </div>
        <div className="flex items-center justify-center mt-10 text-3xl text-white">
          Select your symbol: {symbol}
        </div>
        <div className="flex flex-row items-center justify-center mt-12 gap-10">
          <button
            onClick={() => handleSelectSymbol(SymbolMarker.X)}
            className={`${
              symbol === SymbolMarker.X ? 'bg-blue-500' : 'bg-green-500'
            } rounded-lg hover:bg-blue-500 py-6 px-8 text-4xl font-extrabold text-white transition-colors duration-300`}
          >
            X
          </button>
          <button
            onClick={() => handleSelectSymbol(SymbolMarker.O)}
            className={`${
              symbol === SymbolMarker.O ? 'bg-blue-500' : 'bg-green-500'
            } rounded-lg hover:bg-blue-500 py-6 px-8 text-4xl font-extrabold text-white transition-colors duration-300`}
          >
            O
          </button>
        </div>
        <div className="flex items-center justify-center mt-8 text-2xl text-white">
          Number of players:
          <button
            onClick={() => toggleMultiplayer(multiplayer)}
            className="rounded bg-gray-500 px-4 m-4"
          >
            {multiplayer ? '2P' : '1P'}
          </button>
        </div>
        {renderDifficultyLevel()}
        <div className="mt-16">
          <button
            onClick={start}
            className="rounded-lg hover:bg-blue-500 bg-black p-4 px-16 text-white text-2xl font-semibold transition-colors duration-300"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
