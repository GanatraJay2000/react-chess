import actionTypes from "../actionTypes";

export const openPropmotion = ({ rank, file, x, y }) => ({
  type: actionTypes.OPEN_PROMOTION,
  payload: { rank, file, x, y },
});

export const closePopup = () => ({
  type: actionTypes.CLOSE_POPUP,
});
