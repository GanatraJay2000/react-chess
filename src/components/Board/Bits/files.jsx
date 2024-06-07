import PropTypes from "prop-types";

function Files({ files }) {
  return (
    <div className="files absolute -bottom-7 h-5 grid grid-cols-8 w-bsz">
      {files.map((file) => (
        <div key={file} className="file grid place-content-center">
          {file}
        </div>
      ))}
    </div>
  );
}

Files.propTypes = {
  files: PropTypes.array.isRequired,
};

export default Files;
