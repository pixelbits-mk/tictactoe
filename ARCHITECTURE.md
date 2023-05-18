# Architecture

## Code Organization
The tic-tac-toe solution comprises of several projects that follow the Clean architecture.

![image](https://halogen-byte-345804.web.app/assets/images/clean-architecture.jpeg)

Each project targets a specific layer within the architecture.

![image](https://halogen-byte-345804.web.app/assets/images/architecture-layers.jpeg)

## Technologies

Various technologies have been used to create the game:

- Tailwind CSS
- ReactJS
- Jest (unit testing)
- InversifyJS (DI)

![image](https://halogen-byte-345804.web.app/assets/images/core-technologies.jpeg)

## Packages 

The following summarizes some of the more significant packages used to build the game:

![image](https://halogen-byte-345804.web.app/assets/images/core-packages.jpeg)


## Algorithms

The minimax algorithm is a decision-making algorithm used in game theory and AI that helps determine the best move for a player by considering all possible future moves and their outcomes. At each turn, the AI player recursively explores the game tree to find the optimal move that maximizes its chances of winning or minimizes the opponent's chances of winning. 

Source:  https://www.neverstopbuilding.com/blog/minimax

You can find the code implementation here: https://github.com/pixelbits-mk/tictactoe/blob/main/libs/core/domain/src/lib/algorithms/minimax.ts
