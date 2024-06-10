// import { getChar } from "../../util/helper";
import { cn } from "../../util/cn";
import Ranks from "./Bits/ranks.jsx";
import Files from "./Bits/files.jsx";
import Pieces from "../Pieces/Pieces.jsx";
import { useAppContext } from "../../contexts/Context.js";
import Popup from "../Popup/Popup.jsx";

const Board = () => {
  const { appState } = useAppContext();
  const pos = appState.positions[appState.positions.length - 1];

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

    return _class;
  };

  return (
    <div className="board relative rounded overflow-hidden">
      <Ranks ranks={ranks} />
      <div className="tiles grid grid-cols-8 w-bsz grid-rows-8 h-bsz col-span-11">
        {ranks.map((rank) =>
          files.map((file) => {
            const square = `${file}${rank}`;

            return (
              <div
                key={square}
                className={cn(
                  `tile relative ${getClassName(8 - rank, file - 1)} `
                )}
              >
                {/* {square} */}
              </div>
            );
          })
        )}
      </div>
      <Popup />
      <Pieces />
      <Files files={files} />
    </div>
  );
};

export default Board;
