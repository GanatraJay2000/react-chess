import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, positions } = state;
      turn = turn === "w" ? "b" : "w";
      positions = [...positions, action.payload.newPosition];
      return { ...state, turn, positions };
    }

    case actionTypes.GENERATE_CANDIDATE_MOVES: {
      return { ...state, candidateMoves: action.payload.candidateMoves };
    }

    case actionTypes.CLEAR_CANDIDATES: {
      return { ...state, candidateMoves: [] };
    }

    case actionTypes.SELECT_PIECE: {
      return { ...state, selectedPiece: action.payload.selectedPiece };
    }

    default:
      return state;
  }
};
