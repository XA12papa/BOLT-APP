    "use client";

    import React, { useState } from "react";
    import Square from "./Square";
    import { calculateWinner } from "./game";

    type SquareValue = "X" | "O" | null;

    export default function Board() {
      const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
      const [xIsNext, setXIsNext] = useState(true);

      const { winner, line: winningLine } = calculateWinner(squares);

      function handleClick(i: number) {
        if (squares[i] || winner) return;
        const next = squares.slice();
        next[i] = xIsNext ? "X" : "O";
        setSquares(next);
        setXIsNext(!xIsNext);
      }

      function reset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
      }

      const status = winner ? `Winner: ${winner}` : `Next: ${xIsNext ? "X" : "O"}`;

      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ margin: 0 }}>Tic Tac Toe</h1>
            <p style={{ margin: "8px 0" }}>{status}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)", gap: 0 }}>
            {squares.map((value, idx) => (
              <Square
                key={idx}
                value={value}
                onClick={() => handleClick(idx)}
                highlight={!!(winningLine && winningLine.includes(idx))}
              />
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={reset} style={{ padding: "8px 12px" }}>
              Reset
            </button>
          </div>
        </div>
      );
    }