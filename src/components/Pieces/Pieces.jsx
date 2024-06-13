import arbiter from "../../arbiter/arbiter";
import { getCastlingDirections } from "../../arbiter/getMoves";
import { useAppContext } from "../../contexts/Context";
import {
  detectedCheckMate,
  detectedInsufficientMaterial,
  detectedStalemate,
  updateCastling,
} from "../../reducer/actions/game";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move";
import { openPropmotion } from "../../reducer/actions/popup";
import { copyBoard, getNewMoveNotation } from "../../util/helper";
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

  const openPromotionBox = ({ rank, file, x, y }) => {
    dispatch(openPropmotion({ rank: Number(rank), file: Number(file), x, y }));
  };

  const updateCastlingState = ({ rank, file, piece }) => {
    const direction = getCastlingDirections({
      castlingDirection: appState.castlingDirection,
      piece,
      rank,
      file,
    });
    if (direction) dispatch(updateCastling(direction));
  };

  const move = (e) => {
    const { x, y } = coordinates(e);
    const { rank, file, piece } = appState.selectedPiece;

    if (appState.candidateMoves?.find(([i, j]) => x === i && y === j)) {
      const opponent = piece.startsWith("b") ? "w" : "b";
      const castlingDirection = appState.castlingDirection[`${opponent}`];
      if ((piece === "wp" && x === 0) || (piece === "bp" && x === 7)) {
        openPromotionBox({ rank, file, x, y });
        return;
      }

      if (piece.endsWith("k") || piece.endsWith("r")) {
        updateCastlingState({ rank, file, piece });
      }

      const newPosition = arbiter.performMove({
        pos: copyBoard(currentPosition),
        piece,
        rank,
        file,
        x,
        y,
      });

      const newMove = getNewMoveNotation({
        piece,
        rank,
        file,
        x,
        y,
        position: currentPosition,
      });

      dispatch(makeNewMove({ newPosition, newMove }));

      if (arbiter.isCheckMate(newPosition, opponent, castlingDirection))
        dispatch(detectedCheckMate(piece[0]));
      else if (arbiter.insufficientMaterial(newPosition))
        dispatch(detectedInsufficientMaterial());
      else if (arbiter.isStalemate(newPosition, opponent, castlingDirection))
        dispatch(detectedStalemate());
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
