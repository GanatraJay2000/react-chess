import PropTypes from "prop-types";

function Ranks({ ranks }) {
  return (
    <div className="ranks absolute -left-7 w-5 h-bsz grid grid-rows-8">
      {ranks.map((rank) => (
        <div
          key={rank}
          className="rank grid place-content-center text-[var(--tile-dark)]"
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
