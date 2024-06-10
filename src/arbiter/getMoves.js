export const getRookMoves = ({ pos, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (pos?.[x]?.[y] === undefined) break;
      if (pos[x][y]?.startsWith(us)) break;
      if (pos[x][y]?.startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      moves.push([x, y]);
    }
  });
  return moves;
};

export const getBishopMoves = ({ pos, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (pos?.[x]?.[y] === undefined) break;
      if (pos[x][y]?.startsWith(us)) break;
      if (pos[x][y]?.startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      moves.push([x, y]);
    }
  });
  return moves;
};

export const getQueenMoves = ({ pos, piece, rank, file }) => {
  return [
    ...getRookMoves({ pos, piece, rank, file }),
    ...getBishopMoves({ pos, piece, rank, file }),
  ];
};

export const getKnightMoves = ({ pos, rank, file }) => {
  const moves = [];
  const enemy = pos[rank][file][0] === "w" ? "b" : "w";
  const candidates = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  candidates.forEach(([r, f]) => {
    const x = rank + r;
    const y = file + f;
    const cell = pos?.[x]?.[y];
    if (cell === undefined) return;
    if (cell?.startsWith(enemy) || cell === "") {
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKingMoves = ({ pos, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];

  const direction = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  direction.forEach((dir) => {
    const x = rank + dir[0];
    const y = file + dir[1];
    if (pos?.[x]?.[y] !== undefined && !pos[x][y]?.startsWith(us))
      moves.push([x, y]);
  });
  return moves;
};

export const getPawnMoves = ({ pos, piece, rank, file }) => {
  const moves = [];

  const direction = piece === "wp" ? -1 : 1;

  if (!pos?.[rank + direction][file]) moves.push([rank + direction, file]);
  if (rank % 5 === 1) {
    if (
      pos?.[rank + direction]?.[file] == "" &&
      pos?.[rank + 2 * direction]?.[file] == ""
    )
      moves.push([rank + 2 * direction, file]);
  }

  return moves;
};

export const getPawnCaptures = ({ pos, prevPos, piece, rank, file }) => {
  const moves = [];
  const direction = piece === "wp" ? -1 : 1;
  const enemy = piece[0] === "w" ? "b" : "w";
  const enemyPawn = direction === 1 ? "wp" : "bp";
  const adjacentFiles = [file - 1, file + 1];

  if (
    pos?.[rank + direction]?.[file + 1] &&
    pos?.[rank + direction]?.[file + 1]?.startsWith(enemy)
  )
    moves.push([rank + direction, file + 1]);

  if (
    pos?.[rank + direction]?.[file - 1] &&
    pos?.[rank + direction]?.[file - 1]?.startsWith(enemy)
  ) {
    moves.push([rank + direction, file - 1]);
  }
  // en passant
  if (prevPos) {
    if ((direction === -1 && rank === 3) || (direction === 1 && rank === 4)) {
      adjacentFiles.forEach((f) => {
        if (
          pos?.[rank + direction * 2]?.[f] === "" &&
          prevPos?.[rank]?.[f] === "" &&
          prevPos?.[rank + 2 * direction][f] === enemyPawn
        )
          moves.push([rank + direction, f]);
      });
    }
  }

  return moves;
};
