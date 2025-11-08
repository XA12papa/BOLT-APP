    export type Player = "X" | "O";
    export type SquareValue = Player | null;

    export function calculateWinner(
      squares: SquareValue[]
    ): { winner: Player | null; line: number[] | null } {
      const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return { winner: squares[a] as Player, line: [a, b, c] };
        }
      }

      return { winner: null, line: null };
    }