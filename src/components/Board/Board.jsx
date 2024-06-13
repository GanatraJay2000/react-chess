// import { getChar } from "../../util/helper";
import { cn } from "../../util/cn";
import Ranks from "./Bits/ranks.jsx";
import Files from "./Bits/files.jsx";
import Pieces from "../Pieces/Pieces.jsx";
import { useAppContext } from "../../contexts/Context.js";
import Popup from "../Popup/Popup.jsx";
import arbiter from "../../arbiter/arbiter.js";
import { getKingPos } from "../../arbiter/getMoves.js";
import PromotionBox from "../Popup/PromotionBox/PromotionBox.jsx";
import GameEnds from "../Popup/GameEnds/GameEnds.jsx";

const Board = () => {
  const { appState } = useAppContext();
  const pos = appState.positions[appState.positions.length - 1];

  const isChecked = (() => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: pos,
      player: appState.turn,
    });
    if (isInCheck) return getKingPos(pos, appState.turn);
    return null;
  })();

  const ranks = Array(8)
    .fill()
    .map((_, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((_, i) => i + 1);

  const getClassName = (rank, file) => {
    let _class = "";
    _class +=
      (file + rank) % 2 === 0
        ? " bg-[var(--tile-light)] "
        : " bg-[var(--tile-dark)] ";

    if (appState.candidateMoves?.find(([x, y]) => x === rank && y === file)) {
      if (pos[rank][file]) _class += " tile--candidate ";
      else _class += " tile--highlight ";
    }

    if (isChecked && isChecked[0] === rank && isChecked[1] === file)
      _class += " tile--checked ";

    return _class;
  };

  return (
    <div className="board relative rounded overflow-hidden h-bsz">
      <Ranks ranks={ranks} />
      <div className="tiles grid grid-cols-8 w-bsz grid-rows-8 h-bsz col-span-11">
        {ranks.map((rank) =>
          files.map((file) => {
            const square = `${file - 1}${8 - rank}`;

            return (
              <div
                key={square}
                className={cn(
                  `tile relative ${getClassName(8 - rank, file - 1)} `
                )}
              ></div>
            );
          })
        )}
      </div>
      <Popup>
        <PromotionBox />
        <GameEnds />
      </Popup>
      <Pieces />
      <Files files={files} />
    </div>
  );
};

export default Board;
