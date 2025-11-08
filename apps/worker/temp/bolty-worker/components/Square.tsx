    "use client";

    import * as React from "react";

    type SquareValue = "X" | "O" | null;

    interface Props {
      value: SquareValue;
      onClick: () => void;
    }

    export default function Square({ value, onClick }: Props) {
      return (
        <button
          onClick={onClick}
          className="square-btn focus:outline-none hover:scale-95 transition transform bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md text-2xl font-bold"
          aria-label="square"
        >
          {value ?? ""}
        </button>
      );
    }