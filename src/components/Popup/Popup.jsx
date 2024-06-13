import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "../../contexts/Context.js";
import { closePopup } from "../../reducer/actions/popup.js";
import { Status } from "../../util/constants.js";

function Popup({ children }) {
  const { appState, dispatch } = useAppContext();
  if (appState.status === Status.ongoing) return null;

  const onClosePopup = () => {
    dispatch(closePopup());
  };

  return (
    <div className="popup inset-0 absolute z-10 bg-[var(--tile-highlight)]">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { onClosePopup })
      )}
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Popup;
