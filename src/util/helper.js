export const getCharacter = (file) => String.fromCharCode(file + 96);

export function getChar(code) {
  return String.fromCharCode(code + 96);
}

export const createBoard = () => {
  const positions = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    Array(8).fill("bp"),
    ...Array(4).fill(Array(8).fill("")),
    Array(8).fill("wp"),
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ];

  return positions;
};

export const copyBoard = (board) => {
  const copy = [];
  for (let i = 0; i < board.length; i++) {
    copy.push([...board[i]]);
  }
  return copy;
};

export const areSameColorTiles = (tile1, tile2) =>
  (tile1.x + tile1.y) % 2 === (tile2.x + tile2.y) % 2;

export const findPieceCoords = (pos, piece) => {
  const coords = [];
  pos.forEach((rank, x) => {
    rank.forEach((p, y) => {
      if (p === piece) coords.push({ x, y });
    });
  });
  return coords;
};

export const getNewMoveNotation = ({
  piece,
  rank,
  file,
  x,
  y,
  position,
  promotesTo,
}) => {
  let note = "";
  rank = Number(8 - rank);
  file = Number(file);
  if (piece[1] === "k" && Math.abs(file - y) === 2) {
    if (file < y) return "O-O";
    else return "O-O-O";
  }

  if (piece[1] !== "p") {
    note += piece[1].toUpperCase();
    if (position[x][y]) {
      note += "x";
    }
  } else if (rank !== x && file !== y) {
    note += getCharacter(file + 1) + "x";
  }

  note += getCharacter(y + 1) + (8 - x);

  if (promotesTo) note += "=" + promotesTo.toUpperCase();

  return note;
};
