import actionTypes from "../actionTypes";

export const makeNewMove = ({ newPosition, newMove }) => ({
  type: actionTypes.NEW_MOVE,
  payload: { newPosition, newMove },
});

export const generateCandidateMoves = ({ candidateMoves }) => ({
  type: actionTypes.GENERATE_CANDIDATE_MOVES,
  payload: { candidateMoves },
});

export const clearCandidates = () => ({
  type: actionTypes.CLEAR_CANDIDATES,
});

export const takeBack = () => ({
  type: actionTypes.TAKE_BACK,
});

export const selectPiece = ({ piece, rank, file }) => ({
  type: actionTypes.SELECT_PIECE,
  payload: { selectedPiece: { piece, rank, file } },
});
