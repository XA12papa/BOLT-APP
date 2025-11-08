    "use client";

    import React from "react";
    import Square from "./Square";
    import styles from "./tictactoe.module.css";
    import type { SquareValue } from "./helpers";

    interface BoardProps {
      squares: SquareValue[];
      onPlay: (index: number) => void;
      winningLine?: number[] | null;
    }

    export default function Board({ squares, onPlay, winningLine = null }: BoardProps): JSX.Element {
      return (
        <div className={styles.boardGrid}>
          {squares.map((_, i) => (
            <Square
              key={i}
              value={squares[i]}
              onClick={() => onPlay(i)}
              isWinning={!!winningLine && winningLine.includes(i)}
            />
          ))}
        </div>
      );
    }