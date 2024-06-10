import { createBoard } from "./helper";

export const initialGameState = {
  positions: [createBoard()],
  turn: "w",
  candidateMoves: [],
  selectedPiece: null,
};
