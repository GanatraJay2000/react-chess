import { useAppContext } from "../../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../../reducer/actions/move";
import { copyBoard, getNewMoveNotation } from "../../../util/helper";

import PropTypes from "prop-types";

function PromotionBox({ onClosePopup }) {
  const options = ["q", "b", "n", "r"];
  const { appState, dispatch } = useAppContext();
  const { promotionSquare } = appState;
  if (!promotionSquare) return null;

  const { rank, file, x, y } = promotionSquare;
  const color = x === 0 ? "w" : "b";

  const onClick = (option) => {
    onClosePopup();
    const newPosition = copyBoard(
      appState.positions[appState.positions.length - 1]
    );

    newPosition[rank][file] = "";
    newPosition[x][y] = color + option;

    dispatch(clearCandidates());

    const newMove = getNewMoveNotation({
      ...promotionSquare,
      piece: color + "p",
      promotesTo: option,
      position: appState.positions[appState.positions.length - 1],
    });

    dispatch(makeNewMove({ newPosition, newMove }));
  };

  return (
    <div
      className={`w-16 h-[40.5%] bg-[var(--tile-light)] absolute border-2 border-[var(--tile-light)] [box-shadow:0_0_0_4px_var(--tile-dark)] rounded-sm translate-x-2 flex ${
        color === "w" ? " top-2 " : " bottom-2 "
      }`}
      style={{
        left: `${12.5 * y}%`,
        flexDirection: color === "w" ? "column" : "column-reverse",
      }}
    >
      {options.map((option) => {
        return (
          <div
            key={option}
            className="piece w-full h-1/4 bg-100% hover:bg-[var(--tile-dark)] cursor-pointer rounded"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url("/assets/pieces/${color}${option}.png")`,
            }}
            onClick={() => onClick(option)}
          >
            {/* {option} */}
          </div>
        );
      })}
    </div>
  );
}

PromotionBox.propTypes = {
  onClosePopup: PropTypes.func,
};

export default PromotionBox;
