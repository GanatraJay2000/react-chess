import { useReducer } from "react";
import Board from "./components/Board/Board.jsx";
import AppContext from "./contexts/Context.js";
import { reducer } from "./reducer/Reducer.js";
import { initialGameState } from "./util/constants.js";

function App() {
  const [appState, dispatch] = useReducer(reducer, initialGameState);
  const providerState = { appState, dispatch };

  return (
    <AppContext.Provider value={providerState}>
      <div className="App grid place-content-center bg-[var(--bg-color)] h-screen">
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default App;
