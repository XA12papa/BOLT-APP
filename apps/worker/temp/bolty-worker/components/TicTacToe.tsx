    "use client";

    import * as React from "react";
    import { useState } from "react";
    import Board from "./Board";
    import { calculateWinner } from "../utils/game";

    type SquareValue = "X" | "O" | null;

    export default function TicTacToe(): JSX.Element {
      const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null) as SquareValue[]]);
      const [step, setStep] = useState<number>(0);

      const current = history[step];
      const xIsNext = step % 2 === 0;
      const winner = calculateWinner(current);

      function handlePlay(i: number) {
        if (winner || current[i]) return;

        const next = current.slice() as SquareValue[];
        next[i] = xIsNext ? "X" : "O";

        const newHistory = history.slice(0, step + 1);
        newHistory.push(next);

        setHistory(newHistory);
        setStep(newHistory.length - 1);
      }

      function jumpTo(move: number) {
        setStep(move);
      }

      function resetGame() {
        setHistory([Array(9).fill(null) as SquareValue[]]);
        setStep(0);
      }

      function undo() {
        if (step === 0) return;
        setStep(step - 1);
      }

      let status = "";
      if (winner) {
        status = `Winner: ${winner}`;
      } else if (!current.includes(null)) {
        status = "Draw";
      } else {
        status = `Next player: ${xIsNext ? "X" : "O"}`;
      }

      return (
        <div className="tic-tac-toe mx-auto text-center">
          <div className="status mb-3 text-lg font-semibold">{status}</div>

          <Board squares={current} onPlay={handlePlay} />

          <div className="button-group mt-4 flex justify-center gap-3">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm"
            >
              Reset
            </button>
            <button
              onClick={undo}
              disabled={step === 0}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Undo
            </button>
          </div>

          <div className="mt-4 text-sm">
            <details className="text-left">
              <summary className="cursor-pointer underline">History ({history.length})</summary>
              <ol className="mt-2 list-decimal list-inside">
                {history.map((_, move) => {
                  const desc = move === 0 ? "Go to game start" : `Go to move #${move}`;
                  return (
                    <li key={move} className="mb-1">
                      <button
                        onClick={() => jumpTo(move)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {desc}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </details>
          </div>
        </div>
      );
    }