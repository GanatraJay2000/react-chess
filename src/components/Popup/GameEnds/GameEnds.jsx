import { useAppContext } from "../../../contexts/Context";
import { Status } from "../../../util/constants";
import { setupNewGame } from "../../../reducer/actions/game";

function GameEnds() {
  const {
    appState: { status },
    dispatch,
  } = useAppContext();

  if (status === Status.ongoing || status === Status.promoting) return null;
  const isWin = status.endsWith("wins");

  const newGame = () => {
    dispatch(setupNewGame());
  };

  const getPiece = (pc) => (
    <div
      className={`piece w-[var(--tsz)] h-[var(--tsz)] bg-100% z-[2]`}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("/assets/pieces/${pc}.png")`,
      }}
    />
  );

  return (
    <div
      className={`w-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-color)] text-center flex flex-col items-center justify-center absolute rounded px-2 py-3 `}
    >
      <h1 className="font-bold text-3xl">{isWin ? status : "Draw"}</h1>
      <div className="text-lg">
        {!isWin ? (
          <>
            <p>{status}</p>
            <div className="flex justify-center">
              {getPiece("wk")}
              {getPiece("bk")}
            </div>
          </>
        ) : (
          getPiece(status.startsWith("W") ? "wk" : "bk")
        )}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-[var(--tile-dark)] text-white rounded"
        onClick={newGame}
      >
        New Game
      </button>
    </div>
  );
}

export default GameEnds;
