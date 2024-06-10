import PropTypes from "prop-types";
import { getChar } from "../../../util/helper";

function Files({ files }) {
  return (
    <div className="files absolute bottom-0 grid grid-cols-8 w-bsz ">
      {files.map((file, index) => (
        <div
          key={file}
          className={`file mx-1 grid place-content-end text-sm text-[${
            index % 2 == 1 ? "var(--tile-dark)" : "var(--tile-light)"
          }]`}
        >
          {getChar(file)}
        </div>
      ))}
    </div>
  );
}

Files.propTypes = {
  files: PropTypes.array.isRequired,
};

export default Files;
