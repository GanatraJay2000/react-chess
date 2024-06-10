export function getChar(code) {
  return String.fromCharCode(code + 96);
}

export const createBoard = () => {
  const positions = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    Array(8).fill("bp"),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
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
