import { useState } from 'react';
import './App.css'

enum Player {
  X = 'X',
  O = 'O'
}

function App() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [player, setPlayer] = useState(Player.X);
  const [hasWinner, setHasWinner] = useState<Player | null>(null);

  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const makeMove = (cell: number): void => {
    if (hasWinner) return;
    if (board[cell] === null) {
      const newBoard = [...board];
      newBoard[cell] = player;
      setBoard(newBoard);
      winCheck(newBoard);
      setPlayer(player === Player.X ? Player.O : Player.X);
    }
  }

  const winCheck = (board: string[]) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]) {
        setHasWinner(board[a] as Player);
        return board[a];
      }
    }
    return null;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer(Player.X);
    setHasWinner(null);
  }

  return (
    <>
      <h1>Tic tac Toe</h1>

      <div>

        <div className="board">
          {
            board.map((cell, index) => (
              <div onClick={() => makeMove(index)} key={index} className="cell">
                {cell}
              </div>
            ))
          }
        </div>

        <div className="players">
          <div className={player === Player.X ? "selected" : ""}>Player X</div>
          <div className={player === Player.O ? "selected" : ""}>Player O</div>
        </div>

        {hasWinner && <h2>Player {hasWinner} wins!</h2>}

        <button onClick={resetGame}>Reset Game</button>

      </div>
    </>
  )
}

export default App
