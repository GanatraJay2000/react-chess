import React from "react";
import { useAppContext } from "../../../contexts/Context";

function MovesList() {
  const {
    appState: { movesList },
  } = useAppContext();
  return (
    <div className="grow">
      <h1 className="text-xl mb-3">Moves</h1>
      <div className=" items-start grid grid-cols-5 relative">
        {movesList.map((move, i) => (
          <React.Fragment key={i}>
            {i % 2 === 0 && (
              <div className="text-[var(--tile-dark)] text-left">
                {Math.floor(i / 2) + 1}
              </div>
            )}
            <div className="text-white shrink col-span-2">{move}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default MovesList;
