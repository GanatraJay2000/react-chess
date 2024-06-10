import { copyBoard } from "../util/helper";

export const movePiece = ({ pos, piece, rank, file, x, y }) => {
  const newPosition = copyBoard(pos);
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
