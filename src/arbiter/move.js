import { copyBoard } from "../util/helper";

export const movePiece = ({ pos, piece, rank, file, x, y }) => {
  const newPosition = copyBoard(pos);

  if (piece.endsWith("k") && Math.abs(file - y) === 2) {
    if (y === 2) {
      newPosition[rank][0] = "";
      newPosition[rank][3] = piece.startsWith("w") ? "wr" : "br";
    }
    if (y === 6) {
      newPosition[rank][7] = "";
      newPosition[rank][5] = piece.startsWith("w") ? "wr" : "br";
    }
    newPosition[rank][file] = "";
    newPosition[x][y] = piece;
    return newPosition;
  }

  newPosition[rank][file] = "";
  newPosition[x][y] = piece;
  return newPosition;
};

export const movePawn = ({ pos, piece, rank, file, x, y }) => {
  const newPosition = copyBoard(pos);

  // en passant
  if (!newPosition[x][y] && rank !== x && y !== file) {
    newPosition[rank][y] = "";
  }

  newPosition[rank][file] = "";
  newPosition[x][y] = piece;
  return newPosition;
};
