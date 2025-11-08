export type Player = 'X' | 'O';
export type Square = Player | null;
export type Board = Square[];

export const initialBoard = (): Board => Array<Board>(9).fill(null);

export function getWinnerInfo(board: Board): { winner: Player | null; line: number[] | null } {
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

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }

  return { winner: null, line: null };
}

export function isDraw(board: Board): boolean {
  return board.every((s) => s !== null) && getWinnerInfo(board).winner === null;
}