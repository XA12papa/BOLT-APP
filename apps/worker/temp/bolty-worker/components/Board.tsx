    "use client";

    import * as React from "react";
    import Square from "./Square";

    type SquareValue = "X" | "O" | null;

    interface BoardProps {
      squares: SquareValue[];
      onPlay: (i: number) => void;
    }

    export default function Board({ squares, onPlay }: BoardProps) {
      return (
        <div className="board">
          {squares.map((sq, i) => (
            <Square key={i} value={sq} onClick={() => onPlay(i)} />
          ))}
        </div>
      );
    }