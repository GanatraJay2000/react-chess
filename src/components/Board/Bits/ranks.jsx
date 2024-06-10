import PropTypes from "prop-types";

function Ranks({ ranks }) {
  return (
    <div className="ranks absolute z-[1] left-1 h-bsz grid grid-rows-8">
      {ranks.map((rank, index) => (
        <div
          key={rank}
          className={`rank grid place-content-start text-sm text-[${
            index % 2 == 0 ? "var(--tile-dark)" : "var(--tile-light)"
          }]`}
        >
          {rank}
        </div>
      ))}
    </div>
  );
}

Ranks.propTypes = {
  ranks: PropTypes.array.isRequired,
};

export default Ranks;
