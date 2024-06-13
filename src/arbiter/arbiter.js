import { areSameColorTiles, findPieceCoords } from "../util/helper";
import {
  getKnightMoves,
  getRookMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
  getPawnMoves,
  getPawnCaptures,
  getCastlingMoves,
  getPieces,
  getKingPos,
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

  getValidMoves: function ({
    pos,
    prevPos,
    castlingDirection,
    piece,
    rank,
    file,
  }) {
    let moves = this.getRegularMoves({ pos, piece, rank, file });
    const notInCheckMoves = [];

    if (piece.endsWith("p")) {
      moves = [
        ...moves,
        ...getPawnCaptures({ pos, prevPos, piece, rank, file }),
      ];
    }

    if (piece.endsWith("k")) {
      moves = [
        ...moves,
        ...getCastlingMoves({
          pos,
          castlingDirection,
          piece,
          rank,
          file,
        }),
      ];
    }

    moves.forEach(([x, y]) => {
      const positionAfterMove = this.performMove({
        pos,
        piece,
        rank,
        file,
        x,
        y,
      });

      if (!this.isPlayerInCheck({ positionAfterMove, pos, player: piece[0] }))
        notInCheckMoves.push([x, y]);
    });

    return notInCheckMoves;
  },

  performMove: function ({ pos, piece, rank, file, x, y }) {
    if (piece.endsWith("p")) {
      return movePawn({ pos, piece, rank, file, x, y });
    } else return movePiece({ pos, piece, rank, file, x, y });
  },

  isPlayerInCheck: function ({ positionAfterMove, pos, player }) {
    const enemy = player === "w" ? "b" : "w";
    let kingPos = getKingPos(positionAfterMove, player);
    const enemyPieces = getPieces(positionAfterMove, enemy);

    const enemyMoves = enemyPieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...(p.piece.endsWith("p")
            ? getPawnCaptures({
                pos: positionAfterMove,
                prevPos: pos,
                ...p,
              })
            : this.getRegularMoves({
                pos: positionAfterMove,
                piece: p.piece,
                ...p,
              })),
        ]),
      []
    );

    if (enemyMoves.some(([x, y]) => x === kingPos[0] && y === kingPos[1]))
      return true;
    else return false;
  },

  isStalemate: function (pos, player, castlingDirection) {
    const isInCheck = this.isPlayerInCheck({
      positionAfterMove: pos,
      player,
    });

    if (isInCheck) return false;

    const pieces = getPieces(pos, player);
    const moves = pieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...this.getValidMoves({
            pos,
            castlingDirection,
            ...p,
          }),
        ]),
      []
    );

    return !isInCheck && moves.length === 0;
  },

  insufficientMaterial: function (pos) {
    const pieces = pos.reduce(
      (acc, rank) => (acc = [...acc, ...rank.filter((p) => p)]),
      []
    );

    if (pieces.length === 2) return true;

    if (
      pieces.length === 3 &&
      (pieces.some((p) => p.endsWith("n")) ||
        pieces.some((p) => p.endsWith("b")))
    )
      return true;

    if (
      pieces.length === 4 &&
      pieces.every((p) => p.endsWith("b") || p.endsWith("k")) &&
      new Set(pieces).size === 4 &&
      areSameColorTiles(
        findPieceCoords(pos, "wb")[0],
        findPieceCoords(pos, "bb")[0]
      )
    )
      return true;

    return false;
  },

  isCheckMate: function (pos, player, castlingDirection) {
    const isInCheck = this.isPlayerInCheck({
      positionAfterMove: pos,
      player,
    });

    if (!isInCheck) return false;

    const pieces = getPieces(pos, player);
    const moves = pieces.reduce(
      (acc, p) =>
        (acc = [
          ...acc,
          ...this.getValidMoves({
            pos,
            castlingDirection,
            ...p,
          }),
        ]),
      []
    );

    return isInCheck && moves.length === 0;
  },
};

export default arbiter;
