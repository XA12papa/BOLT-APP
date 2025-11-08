    "use client";

    import React from "react";
    import styles from "./tictactoe.module.css";
    import type { SquareValue } from "./helpers";

    interface SquareProps {
      value: SquareValue;
      onClick: () => void;
      isWinning?: boolean;
    }

    export default function Square({ value, onClick, isWinning = false }: SquareProps): JSX.Element {
      return (
        <button
          type="button"
          aria-label="tic-tac-toe-square"
          onClick={onClick}
          className={`${styles.square} ${isWinning ? styles.win : ""}`}
        >
          {value}
        </button>
      );
    }