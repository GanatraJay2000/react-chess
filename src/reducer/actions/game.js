import actionTypes from "../actionTypes";

export const updateCastling = (direction) => {
  return {
    type: actionTypes.CAN_CASTLE,
    payload: direction,
  };
};

export const detectedStalemate = () => ({
  type: actionTypes.STALEMATE,
});

export const detectedInsufficientMaterial = () => ({
  type: actionTypes.INSUFFICIENT_MATERIAL,
});

export const detectedCheckMate = (winner) => ({
  type: actionTypes.WIN,
  payload: winner,
});

export const setupNewGame = () => ({
  type: actionTypes.NEW_GAME,
});
