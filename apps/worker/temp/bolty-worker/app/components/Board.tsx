"use client";

import React from "react";
import Square from "./Square";
import type { Board as BoardType } from "../lib/tictactoe";

type Props = {
  squares: BoardType;
  onPlay: (index: number) => void;
  winningLine: number[] | null;
};

export default function Board({ squares, onPlay, winningLine }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {squares.map((s, i) => (
        <Square
          key={i}
          value={s}
          onClick={() => onPlay(i)}
          highlight={Boolean(winningLine?.includes(i))}
        />
      ))}
    </div>
  );
}