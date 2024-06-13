import arbiter from "./arbiter";

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

export const getCastlingMoves = ({
  pos,
  castlingDirection,
  piece,
  rank,
  file,
}) => {
  const moves = [];

  if (file !== 4 || rank % 7 !== 0 || castlingDirection === "none")
    return moves;

  if (piece.startsWith("w")) {
    if (
      arbiter.isPlayerInCheck({
        positionAfterMove: pos,
        player: "w",
      })
    )
      return moves;

    if (
      ["left", "both"].includes(castlingDirection) &&
      !pos[7][1] &&
      !pos[7][2] &&
      !pos[7][3] &&
      pos[7][0] === "wr" &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 7,
          y: 3,
        }),
        player: "w",
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 7,
          y: 2,
        }),
        player: "w",
      })
    )
      moves.push([7, 2]);

    if (
      ["right", "both"].includes(castlingDirection) &&
      !pos[7][5] &&
      !pos[7][6] &&
      pos[7][7] === "wr" &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 7,
          y: 5,
        }),
        player: "w",
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 7,
          y: 6,
        }),
        player: "w",
      })
    )
      moves.push([7, 6]);
  } else {
    if (
      arbiter.isPlayerInCheck({
        positionAfterMove: pos,
        player: "b",
      })
    )
      return moves;

    if (
      ["left", "both"].includes(castlingDirection) &&
      !pos[0][1] &&
      !pos[0][2] &&
      !pos[0][3] &&
      pos[0][0] === "br" &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 0,
          y: 3,
        }),
        pos: pos,
        player: "b",
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 0,
          y: 2,
        }),
        pos: pos,
        player: "b",
      })
    )
      moves.push([0, 2]);

    if (
      ["right", "both"].includes(castlingDirection) &&
      !pos[0][5] &&
      !pos[0][6] &&
      pos[0][7] === "br" &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 0,
          y: 5,
        }),
        pos,
        player: "b",
      }) &&
      !arbiter.isPlayerInCheck({
        positionAfterMove: arbiter.performMove({
          pos,
          piece,
          rank,
          file,
          x: 0,
          y: 6,
        }),
        pos,
        player: "b",
      })
    )
      moves.push([0, 6]);
  }

  return moves;
};

export const getCastlingDirections = ({
  castlingDirection,
  piece,
  rank,
  file,
}) => {
  const direction = castlingDirection[piece[0]];
  if (piece.endsWith("k")) return "none";

  if (file == 7 && (rank == 0 || rank == 7)) {
    if (direction === "both") return "left";
    else if (direction === "right") return "none";
  }
  if (file == 0 && (rank == 0 || rank == 7)) {
    if (direction === "both") return "right";
    else if (direction === "left") return "none";
  }
};

export const getPieces = (pos, enemy) => {
  const enemyPieces = [];
  pos.forEach((rank, x) => {
    rank.forEach((file, y) => {
      if (pos[x][y].startsWith(enemy))
        enemyPieces.push({
          piece: pos[x][y],
          rank: x,
          file: y,
        });
    });
  });
  return enemyPieces;
};

export const getKingPos = (pos, player) => {
  let kingPos;
  pos.forEach((rank, x) => {
    rank.forEach((file, y) => {
      if (pos[x][y].startsWith(player) && pos[x][y].endsWith("k"))
        kingPos = [x, y];
    });
  });
  return kingPos;
};
