    import React, { useState } from "react";
    import Board from "./Board";
    import styles from "./Game.module.css";
    import { calculateWinner } from "../lib/game";

    type SquareValue = "X" | "O" | null;

    export default function Game(): JSX.Element {
      const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
      const [xIsNext, setXIsNext] = useState(true);

      function handlePlay(i: number) {
        if (calculateWinner(squares) || squares[i]) return;
        const copy = squares.slice();
        copy[i] = xIsNext ? "X" : "O";
        setSquares(copy);
        setXIsNext(!xIsNext);
      }

      function restart() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
      }

      function undo() {
        const lastIndex = squares.reduce((acc, v, i) => (v ? i : acc), -1);
        if (lastIndex === -1) return;
        const copy = squares.slice();
        copy[lastIndex] = null;
        setSquares(copy);
        setXIsNext((prev) => !prev);
      }

      const winner = calculateWinner(squares);
      const isDraw = !winner && squares.every(Boolean);

      let status: string;
      if (winner) status = `Winner: ${winner}`;
      else if (isDraw) status = "Draw";
      else status = `Next player: ${xIsNext ? "X" : "O"}`;

      return (
        <div className={styles.game}>
          <h1>Tic Tac Toe</h1>
          <div className={styles.status + (winner ? " " + styles.winner : "")}>
            {status}
          </div>
          <Board squares={squares} onPlay={handlePlay} />
          <div className={styles.controls}>
            <button className={styles.button} onClick={restart}>
              Restart
            </button>
            <button className={`${styles.button} ${styles.secondary}`} onClick={undo}>
              Undo
            </button>
          </div>
        </div>
      );
    }