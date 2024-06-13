import { useReducer } from "react";
import Board from "./components/Board/Board.jsx";
import AppContext from "./contexts/Context.js";
import { reducer } from "./reducer/Reducer.js";
import { initialGameState } from "./util/constants.js";
import Controls from "./components/Controls/Controls.jsx";
import MovesList from "./components/Controls/bits/MovesList.jsx";
import TakeBack from "./components/Controls/bits/TakeBack.jsx";

function App() {
  const [appState, dispatch] = useReducer(reducer, initialGameState);
  const providerState = { appState, dispatch };

  return (
    <AppContext.Provider value={providerState}>
      <div className="App grid md:place-content-center bg-[var(--bg-color)] min-h-screen">
        <div className="min-h-bsz flex gap-5 flex-col lg:flex-row items-center justify-center ">
          <Board />
          <Controls>
            <MovesList />
            <TakeBack />
          </Controls>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
