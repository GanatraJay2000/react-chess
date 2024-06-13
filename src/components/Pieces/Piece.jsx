import PropTypes from "prop-types";
import { useAppContext } from "../../contexts/Context";
import { cn } from "../../util/cn";
import arbiter from "../../arbiter/arbiter";
import {
  generateCandidateMoves,
  selectPiece,
} from "../../reducer/actions/move";

function Piece({ rank, file, piece }) {
  const { appState, dispatch } = useAppContext();
  const { turn, castlingDirection, positions } = appState;
  const currentPosition = positions[positions.length - 1];

  const setData = (e, tag, val) => {
    const dataTransfer = e.originalEvent
      ? e.originalEvent.dataTransfer
      : e.dataTransfer;
    dataTransfer.setData(tag, val);
  };

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    dispatch(selectPiece({ piece, rank, file }));
    setData(e, "rank", rank);
    setData(e, "file", file);
    setData(e, "piece", piece);
    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        pos: currentPosition,
        prevPos: positions[positions.length - 2],
        piece,
        castlingDirection: castlingDirection[turn],
        rank,
        file,
      });
      dispatch(generateCandidateMoves({ candidateMoves }));
    }

    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  };

  const onDragEnd = (e) => (e.target.style.display = "block");

  return (
    <div
      className={cn(
        `piece ${piece} p-${rank}${file} w-[var(--tsz)] h-[var(--tsz)] bg-100% z-[2]`
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("/src/assets/pieces/${piece}.png")`,
        gridColumnStart: file + 1,
        gridRowStart: rank + 1,
      }}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    ></div>
  );
}

Piece.propTypes = {
  rank: PropTypes.number.isRequired,
  file: PropTypes.number.isRequired,
  piece: PropTypes.string.isRequired,
};

export default Piece;
