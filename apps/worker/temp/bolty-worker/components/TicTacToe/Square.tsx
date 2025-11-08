    "use client";

    import type { Player } from "../../lib/tictactoe";

    type SquareProps = {
      value: Player | null;
      onClick: () => void;
      highlight?: boolean;
    };

    export default function Square({
      value,
      onClick,
      highlight = false,
    }: SquareProps): JSX.Element {
      return (
        <button
          className={`square ${highlight ? "highlight" : ""}`}
          onClick={onClick}
          aria-label={`square-${value ?? "empty"}`}
          type="button"
        >
          {value}
        </button>
      );
    }