"use client";

import React from "react";
import type { Player } from "../lib/tictactoe";

type Props = {
  value: Player | null;
  onClick: () => void;
  highlight?: boolean;
};

export default function Square({ value, onClick, highlight = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Square ${value ?? "empty"}`}
      className={`w-20 h-20 flex items-center justify-center text-3xl font-bold border border-gray-300 dark:border-gray-600 rounded ${
        highlight ? "bg-yellow-200" : "bg-white dark:bg-gray-900"
      }`}
    >
      {value}
    </button>
  );
}