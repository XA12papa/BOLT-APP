"use client";

import React, { useState } from "react";
import Board from "./Board";
import { initialBoard, getWinnerInfo, isDraw } from "../lib/tictactoe";
import type { Board as BoardType } from "../lib/tictactoe";

export default function Game() {
  const [board, setBoard] = useState<BoardType>(initialBoard());
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const { winner, line } = getWinnerInfo(board);
  const draw = isDraw(board);

  function handlePlay(index: number) {
    if (winner || board[index]) return;
    const next = board.slice();
    next[index] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(initialBoard());
    setXIsNext(true);
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Tic Tac Toe</h1>

      <Board squares={board} onPlay={handlePlay} winningLine={line} />

      <div className="mt-4 text-lg">
        {winner ? (
          <span className="text-green-600">Winner: {winner}</span>
        ) : draw ? (
          <span className="text-gray-600">Draw</span>
        ) : (
          <span>Next player: {xIsNext ? "X" : "O"}</span>
        )}
      </div>

      <div className="mt-4">
        <button onClick={resetGame} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Reset
        </button>
      </div>
    </div>
  );
}