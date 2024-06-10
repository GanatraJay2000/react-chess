import {
  getKnightMoves,
  getRookMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
  getPawnMoves,
  getPawnCaptures,
} from "./getMoves";
import { movePawn, movePiece } from "./move";

const arbiter = {
  getRegularMoves: function ({ pos, piece, rank, file }) {
    if (piece.endsWith("k")) return getKingMoves({ pos, piece, rank, file });
    if (piece.endsWith("q")) return getQueenMoves({ pos, piece, rank, file });
    if (piece.endsWith("r")) return getRookMoves({ pos, piece, rank, file });
    if (piece.endsWith("b")) return getBishopMoves({ pos, piece, rank, file });
    if (piece.endsWith("n")) return getKnightMoves({ pos, rank, file });
    if (piece.endsWith("p")) return getPawnMoves({ pos, piece, rank, file });
  },

  getValidMoves: function ({ pos, prevPos, piece, rank, file }) {
    let moves = this.getRegularMoves({ pos, piece, rank, file });
    if (piece.endsWith("p")) {
      moves = [
        ...moves,
        ...getPawnCaptures({ pos, prevPos, piece, rank, file }),
      ];
    }
    return moves;
  },

  performMove: function ({ pos, piece, rank, file, x, y }) {
    if (piece.endsWith("p")) {
      return movePawn({ pos, piece, rank, file, x, y });
    } else return movePiece({ pos, piece, rank, file, x, y });
  },
};

export default arbiter;
