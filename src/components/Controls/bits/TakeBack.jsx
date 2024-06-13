import { useAppContext } from "../../../contexts/Context";
import { takeBack } from "../../../reducer/actions/move";

function TakeBack() {
  const { dispatch } = useAppContext();
  return (
    <div>
      <button
        className="bg-[var(--tile-dark)] px-4 py-2 w-full rounded"
        onClick={() => dispatch(takeBack())}
      >
        Takeback
      </button>
    </div>
  );
}

export default TakeBack;
