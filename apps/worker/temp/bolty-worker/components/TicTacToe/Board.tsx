    "use client";

    import Square from "./Square";
    import type { Player } from "../../lib/tictactoe";

    type BoardProps = {
      squares: Array<Player | null>;
      onClick: (i: number) => void;
      winningLine?: number[] | null;
    };

    export default function Board({
      squares,
      onClick,
      winningLine = null,
    }: BoardProps): JSX.Element {
      return (
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {squares.map((value, i) => (
            <Square
              key={i}
              value={value}
              onClick={() => onClick(i)}
              highlight={!!winningLine && winningLine.includes(i)}
            />
          ))}
        </div>
      );
    }