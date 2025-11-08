    "use client";

    import React from "react";

    type SquareProps = {
      value: "X" | "O" | null;
      onClick: () => void;
      highlight?: boolean;
    };

    export default function Square({ value, onClick, highlight = false }: SquareProps) {
      const style: React.CSSProperties = {
        width: 80,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        fontWeight: 700,
        backgroundColor: highlight ? "#fffbdd" : "#ffffff",
        border: "1px solid #ccc",
        cursor: "pointer",
        userSelect: "none",
      };

      return (
        <button aria-label="tic-tac-toe-square" onClick={onClick} style={style}>
          {value}
        </button>
      );
    }