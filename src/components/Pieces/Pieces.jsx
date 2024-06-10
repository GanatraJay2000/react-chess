import arbiter from "../../arbiter/arbiter";
import { useAppContext } from "../../contexts/Context";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import { copyBoard } from "../../util/helper";
import Piece from "./Piece";
import { useRef } from "react";

function Pieces() {
  const { appState, dispatch } = useAppContext();

  const currentPosition = appState.positions[appState.positions.length - 1];

  const ref = useRef(null);

  const coordinates = (e) => {
    const { width, left, top } = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = Math.floor((e.clientY - top) / size);
    return { x, y };
  };

  const move = (e) => {
    const { x, y } = coordinates(e);
    const { rank, file, piece } = appState.selectedPiece;

    if (appState.candidateMoves?.find(([i, j]) => x === i && y === j)) {
      const newPosition = arbiter.performMove({
        pos: copyBoard(currentPosition),
        piece,
        rank,
        file,
        x,
        y,
      });
      dispatch(makeNewMove({ newPosition }));
    }
    dispatch(clearCandidates());
  };

  const onDrop = (e) => {
    e.preventDefault();
    move(e);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="pieces grid grid-cols-8 grid-rows-8 absolute inset-0"
    >
      {currentPosition.map((r, rank) => {
        return r.map((f, file) =>
          currentPosition[rank][file] ? (
            <Piece key={rank + "-" + file} rank={rank} file={file} piece={f} />
          ) : null
        );
      })}
    </div>
  );
}

export default Pieces;
