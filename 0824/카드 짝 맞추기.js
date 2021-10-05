const move = (from, to, board) => {
  let turns = 0;
  const fromX = from[0];
  const fromY = from[1];
  const toX = to[0];
  const toY = to[1];
  const xDist = toX - fromX;
  const yDist = toY - fromY;
  
  let xFirst = 0;
  // x축 먼저 이동하기
  xFirst += moveX(from[0], to[0], from[1], board);
  xFirst += moveY(from[1], to[1], to[0], board);
  
  let yFirst = 0;
  // y축 먼저 이동하기
  yFirst += moveY(from[1], to[1], from[0], board);
  yFirst += moveX(from[0], to[0], to[1], board);
  return xFirst < yFirst ? xFirst : yFirst;
}

const moveX = (from, to, col, board) => {
  let turns = 0;
  const xDist = to - from;

  if (xDist === 0) turns = 0;
  else if (Math.abs(xDist) === 1) turns = 1;
  else if (xDist === 2) {
      if (board[from+1][col] === 0 && (board[from+2][col] !== 0 || from+2 === 3)) {
          turns = 1;
      }
      else turns = 2;
  }
  else if (xDist === -2) {
      if (board[from-1][col] === 0 && (board[from-1][col] !== 0 || from-2 === 0)) {
          turns = 1;
      }
      else turns = 2;
  }
  else if (Math.abs(xDist) === 3) {
      let cnt = 1;
      for(let i = 1; i < 3; i++) {
          if (board[i][col] !== 0) cnt++
      }
      turns = cnt;
  }
  return turns;
}

const moveY = (from, to, row, board) => {
  let turns = -1;
  const yDist = to - from;
  
  if (yDist === 0) return 0;
  else if (Math.abs(yDist) === 1) return 1;
  else if (yDist === 2) {
      if (board[row][from+1] === 0 && (board[row][from+2] !== 0 || from+2 === 3)) {
          return 1;
      }
      else return 2;
  }
  else if (yDist === -2) {
      if (board[row][from-1] === 0 && (board[row][from-2] !== 0 || from-2 === 0)) {
          return 1;
      }
      else return 2;
  }
  else if (Math.abs(yDist) === 3) {
      let cnt = 1;
      for(let i = 1; i < 3; i++) {
          if (board[row][i] !== 0) cnt++;
      }
      return cnt;
  }
}

const permutation = (arr, selectNum) => {
  let result = [];
  if(selectNum === 1) return arr.map((v) => [v]);
  
  arr.forEach((val, idx, arr) => {
      const fixer = val;
      const restArr = arr.filter((_, index) => index !== idx);
      const permutationArr = permutation(restArr, selectNum - 1);
      const combineFixer = permutationArr.map((v) => result.push([fixer, ...v]));
  });
  
  return result;
}
function solution(board, r, c) {
  var answer = -1;
  let curX = r;
  let curY = c;
  
  const orders = permutation([1,2,3,4,5,6], 6);
  const whoFirst = 0;
  let points = Array.from(Array(6), () => []);
  let flipped = 0;
  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          if(board[i][j] !== 0) {
              points[board[i][j]-1].push([i, j]);
              flipped += 1;
          }
      }
  }
  console.log(move([0,3], [3,0], [[0,1,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]))
  for(let firstBit = 0; firstBit < 64; firstBit++){
      const bits = firstBit.toString(2).padStart(6, '0');
      orders.map(order => {
          let newBoard = board.map(v => v.slice());
          let current = [r, c];
          let turns = 0;
          let log = [];
          let logTurns = [];
          for(let i = 0; i < 6; i++){
              //console.log('c',current)
              const next = order[i];
              const pointIdx = next-1;

              if (points[pointIdx].length === 0) continue;

              const [pos1, pos2] = points[pointIdx];
              if (bits[i] === '0') {
                  log.push(pos1, pos2)
                  logTurns.push(move(current, pos1, newBoard))
                  logTurns.push(move(pos1, pos2, newBoard))
                  const turn = move(current, pos1, newBoard) + move(pos1, pos2, newBoard);
                  current = pos2;
                  turns += turn;
              }
              else if(bits[i] === '1') {
                  log.push(pos2, pos1)
                  logTurns.push(move(current, pos2, newBoard))
                  logTurns.push(move(pos2, pos1, newBoard))
                  const turn = move(current, pos2, newBoard) + move(pos2, pos1, newBoard);
                  current = pos1;
                  turns += turn;
              }
              newBoard[pos1[0]][pos1[1]] = 0;
              newBoard[pos2[0]][pos2[1]] = 0;
          }
          if (answer === -1 || answer > turns){
              answer = turns;
              console.log(order, turns, log, logTurns, bits)
          }
      });
  }
  return answer + flipped;
}
//solution([[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]], 1, 0)
console.log(solution([[0,1,0,0],[2,3,2,0],[0,3,1,0],[0,0,0,0]], 2, 2))