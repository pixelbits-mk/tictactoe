import { GameState, GameStatus } from '@tictac/domain'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppState, SettingsState } from '../../models'
import { backToMenu, startNextGame, store } from '../../store'

function Modal() {
  const navigate = useNavigate()
  const settingsState = useSelector<AppState, SettingsState>(
    (state: AppState) => state.settings
  )
  const gameState = useSelector<AppState, GameState>(
    (state: AppState) => state.game
  )
  const status = gameState.status

  let title = ''
  let message = ''
  let iconColor = ''
  if (!settingsState.multiplayer) {
    if (status === GameStatus.WIN) {
      title = 'Victory!'
      message = 'Congratulations on your well-deserved victory!'
      iconColor = 'bg-green-100'
    } else if (status === GameStatus.LOSE) {
      title = 'Defeat!'
      message = "Don't worry, you'll get them next time. Keep practicing!"
      iconColor = 'bg-red-100'
    } else if (status === GameStatus.DRAW) {
      title = "It's a Draw!"
      message = 'The game ended in a draw. Try again for a decisive victory!'
      iconColor = 'bg-gray-100'
    }
  } else {
    if (gameState.winner) {
      title = `${gameState.winner.name} Victory!`
      message = 'Congratulations on your well-deserved victory!'
      iconColor = 'bg-green-100'
    }
    if (status === GameStatus.DRAW) {
      title = "It's a Draw!"
      message = 'The game ended in a draw. Try again for a decisive victory!'
      iconColor = 'bg-gray-100'
    }
  }

  function handleNextGame() {
    store.dispatch(startNextGame())
  }
  function handleBackToMenu() {
    store.dispatch(backToMenu())
    navigate('/menu')
  }

  function getIcon() {
    if (!settingsState.multiplayer) {
      if (status === GameStatus.WIN) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            aria-hidden="true"
            className={`h-6 w-6 ${iconColor} rounded-full p-1 text-green-600`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        )
      }
      if (status === GameStatus.LOSE) {
        return (
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        )
      }
      if (status === GameStatus.DRAW) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )
      }
    } else {
      if (gameState.winner) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            aria-hidden="true"
            className={`h-6 w-6 ${iconColor} rounded-full p-1 text-green-600`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        )
      }
      if (status === GameStatus.DRAW) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )
      }
    }
  }

  return (
    <div className={message ? '' : 'hidden'}>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${iconColor}`}
                  >
                    {getIcon()}
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleNextGame}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Next Game
                </button>
                <button
                  onClick={handleBackToMenu}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Exit to Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
