    "use client";

    import React, { useState } from "react";
    import Board from "./Board";
    import { calculateWinner, SquareValue } from "./helpers";
    import styles from "./tictactoe.module.css";

    export default function TicTacToe(): JSX.Element {
      const [squares, setSquares] = useState<SquareValue[]>(() => Array(9).fill(null));
      const [xIsNext, setXIsNext] = useState<boolean>(true);

      const { winner, line } = calculateWinner(squares);

      function handlePlay(index: number) {
        if (squares[index] || winner) return;
        const next = squares.slice();
        next[index] = xIsNext ? "X" : "O";
        setSquares(next);
        setXIsNext(!xIsNext);
      }

      function restart() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
      }

      const isDraw = !winner && squares.every(Boolean);

      return (
        <div className={styles.container}>
          <h2 className={styles.title}>Tic Tac Toe</h2>

          <Board squares={squares} onPlay={handlePlay} winningLine={line} />

          <div className={styles.info}>
            <div className={styles.status}>
              {winner ? (
                <>
                  Winner: <strong>{winner}</strong>
                </>
              ) : isDraw ? (
                <strong>Draw</strong>
              ) : (
                <>
                  Next: <strong>{xIsNext ? "X" : "O"}</strong>
                </>
              )}
            </div>

            <div className={styles.controls}>
              <button className={styles.button} onClick={restart}>
                Restart
              </button>
            </div>
          </div>
        </div>
      );
    }