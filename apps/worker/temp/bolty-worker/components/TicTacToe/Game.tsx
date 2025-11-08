    "use client";

    import { useState } from "react";
    import Board from "./Board";
    import { calculateWinner, type Player } from "../../lib/tictactoe";

    export default function Game(): JSX.Element {
      const [history, setHistory] = useState<Array<Array<Player | null>>>([
        Array(9).fill(null),
      ]);
      const [step, setStep] = useState<number>(0);

      const squares = history[step];
      const xIsNext = step % 2 === 0;
      const { winner, line } = calculateWinner(squares);

      function handleClick(i: number) {
        if (winner || squares[i]) return;
        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        const newHistory = history.slice(0, step + 1).concat([newSquares]);
        setHistory(newHistory);
        setStep(newHistory.length - 1);
      }

      function restart() {
        setHistory([Array(9).fill(null)]);
        setStep(0);
      }

      function jumpTo(move: number) {
        setStep(move);
      }

      return (
        <div className="ttt-container">
          <h1 style={{ margin: 0 }}>Tic Tac Toe</h1>

          <Board squares={squares} onClick={handleClick} winningLine={line} />

          <div className="ttt-status">
            {winner
              ? `Winner: ${winner}`
              : squares.every(Boolean)
              ? "Draw"
              : `Next player: ${xIsNext ? "X" : "O"}`}
          </div>

          <div className="ttt-controls">
            <button onClick={restart} className="btn">
              Restart
            </button>

            <div className="moves" aria-label="move-history">
              {history.map((_, move) => (
                <button
                  key={move}
                  onClick={() => jumpTo(move)}
                  className={move === step ? "active-move" : ""}
                >
                  {move === 0 ? "Start" : `Move #${move}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }