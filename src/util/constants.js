import { createBoard } from "./helper";

export const Status = {
  ongoing: "Ongoing",
  checkmate: "Checkmate",
  stalemate: "Game Draw due to Stalemate",
  insufficient: "Game Draw due to Insufficient Material",
  promoting: "Promoting",
  white: "White wins",
  black: "Black wins",
};

export const initialGameState = {
  positions: [createBoard()],
  turn: "w",
  candidateMoves: [],
  selectedPiece: null,
  status: Status.ongoing,
  promotionSquare: null,
  castlingDirection: {
    w: "both",
    b: "both",
  },
  movesList: [],
};
