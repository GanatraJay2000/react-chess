import { getChar } from "../../util/helper";
import { cn } from "../../util/cn";
import Ranks from "./Bits/ranks.jsx";
import Files from "./Bits/files.jsx";

const Board = () => {
  const ranks = Array(8)
    .fill()
    .map((_, i) => 8 - i);

  const files = Array(8)
    .fill()
    .map((_, i) => getChar(i));

  return (
    <div className="board relative mb-5">
      <Ranks ranks={ranks} />
      <div className="tiles grid grid-cols-8 w-bsz grid-rows-8 h-bsz col-span-11">
        {ranks.map((rank) =>
          files.map((file) => {
            const square = `${file}${rank}`;
            const color =
              (file.charCodeAt(0) + rank) % 2 === 0
                ? "tile--light bg-[var(--tile-light)]"
                : "tile--dark bg-[var(--tile-dark)]";
            return (
              <div
                key={square}
                className={cn(`tile ${color} grid place-content-center`)}
              >
                {square}
              </div>
            );
          })
        )}
      </div>
      <Files files={files} />
    </div>
  );
};

export default Board;
