import React from "react";
import PropTypes from "prop-types";

function Controls({ children }) {
  return (
    <div className="bg-[var(--bg-dark)] h-full rounded p-2 w-60 flex flex-col">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child)
      )}
    </div>
  );
}

Controls.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Controls;
