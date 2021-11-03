function solution(rectangle, characterX, characterY, itemX, itemY) {
  var answer = 0;
  const boardLength = 50;
  let board = Array.from(new Array(boardLength + 1).fill([]));
  board = board.map((el) => new Array(boardLength + 1).fill(0));
  rectangle.map((rect) => {
    const [leftX, botY, rightX, topY] = rect;
    for (let i = leftX; i < rightX; i++) {
      for (let j = botY; j < topY; j++) {
        board[i][j] = 1;
      }
    }
  });
  var curX = characterX;
  var curY = characterY;
  var visit = Array.from(new Array(boardLength + 1).fill([]));
  visit = visit.map((el) => new Array(boardLength + 1).fill(0));
  visit[curX][curY] = 1;
  const startCand = [];
  if (verify(board, curX + 1, curY)) startCand.push([curX + 1, curY]);
  if (verify(board, curX, curY + 1)) startCand.push([curX, curY + 1]);
  if (verify(board, curX - 1, curY)) startCand.push([curX - 1, curY]);
  if (verify(board, curX, curY - 1)) startCand.push([curX, curY - 1]);
  visit[startCand[0][0]][startCand[0][1]] = 1;
  let cnt1 = 0;
  while (curX !== itemX || curY !== itemY) {
    cnt1 += 1;
    const [newX, newY] = move(board, curX, curY, visit);
    visit[newX][newY] = 1;
    curX = newX;
    curY = newY;
  }
  var curX = characterX;
  var curY = characterY;
  var visit = Array.from(new Array(boardLength + 2).fill([]));
  visit = visit.map((el) => new Array(boardLength + 2).fill(0));
  console.log(visit.length);
  console.log(visit[0].length);
  visit[curX][curY] = 1;
  visit[startCand[1][0]][startCand[1][1]] = 1;
  let cnt2 = 0;
  while (curX !== itemX || curY !== itemY) {
    cnt2 += 1;
    const [newX, newY] = move(board, curX, curY, visit);
    visit[newX][newY] = 1;
    curX = newX;
    curY = newY;
  }
  answer = cnt1 > cnt2 ? cnt2 : cnt1;
  return answer;
}

function move(board, x, y, visit) {
  console.log(x, y);
  if (x < visit.length && visit[x + 1][y] === 0 && y > 0 && board[x][y - 1] + board[x][y] === 1) return [x + 1, y];
  else if (y < visit.length && visit[x][y + 1] === 0 && x > 0 && board[x - 1][y] + board[x][y] === 1) return [x, y + 1];
  else if (x > 1 && y > 0 && visit[x - 1][y] === 0 && board[x - 1][y] + board[x - 1][y - 1] === 1) return [x - 1, y];
  else if (y > 1 && x > 0 && visit[x][y - 1] === 0 && board[x - 1][y - 1] + board[x][y - 1] === 1) return [x, y - 1];
  else return [x, y];
}

function verify(board, x, y) {
  if (x > 0 && y > 0 && board[x - 1][y - 1] === 1 && y > 0 && board[x][y - 1] === 1 && x > 0 && board[x - 1][y] === 1 && board[x][y] === 1) {
    return false;
  } else if (x > 0 && y > 0 && board[x - 1][y - 1] === 0 && y > 0 && board[x][y - 1] === 0 && x > 0 && board[x - 1][y] === 0 && board[x][y] === 0) {
    return false;
  }
  return true;
}

solution([[1, 1, 50, 50]], 1, 1, 50, 50);
