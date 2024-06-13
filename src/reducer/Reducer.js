import { Status, initialGameState } from "../util/constants";
import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, positions, movesList } = state;
      turn = turn === "w" ? "b" : "w";
      positions = [...positions, action.payload.newPosition];

      movesList = [...movesList, action.payload.newMove];
      return { ...state, movesList, turn, positions };
    }

    case actionTypes.GENERATE_CANDIDATE_MOVES: {
      return { ...state, candidateMoves: action.payload.candidateMoves };
    }

    case actionTypes.TAKE_BACK: {
      let { turn, positions, movesList } = state;

      if (positions.length > 1) {
        positions = positions.slice(0, positions.length - 1);
        movesList = movesList.slice(0, movesList.length - 1);
        turn = turn === "w" ? "b" : "w";
      }

      return { ...state, turn, positions, movesList };
    }

    case actionTypes.CLEAR_CANDIDATES: {
      return { ...state, candidateMoves: [] };
    }

    case actionTypes.SELECT_PIECE: {
      return { ...state, selectedPiece: action.payload.selectedPiece };
    }

    case actionTypes.CLOSE_POPUP: {
      return { ...state, status: Status.ongoing, promotionSquare: null };
    }

    case actionTypes.OPEN_PROMOTION: {
      return {
        ...state,
        status: Status.promoting,
        promotionSquare: { ...action.payload },
      };
    }

    case actionTypes.CAN_CASTLE: {
      let { turn, castlingDirection } = state;
      castlingDirection[turn] = action.payload;
      return {
        ...state,
        castlingDirection,
      };
    }

    case actionTypes.STALEMATE: {
      return { ...state, status: Status.stalemate };
    }

    case actionTypes.INSUFFICIENT_MATERIAL: {
      return { ...state, status: Status.insufficient };
    }

    case actionTypes.WIN: {
      return {
        ...state,
        status: action.payload === "w" ? Status.white : Status.black,
      };
    }

    case actionTypes.NEW_GAME: {
      return {
        ...initialGameState,
      };
    }

    default:
      return state;
  }
};
