function solution(board) {
  var answer = 0;
  let blocks = new Map();
  for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board.length; j++) {
          if (board[i][j] !== 0) {
              const blockNum = board[i][j];
              if (blocks.has(blockNum) === false) blocks.set(blockNum, []);
              let pointList = blocks.get(blockNum);
              pointList.push([i, j]);
          }
      }
  }
  //console.log(...blocks)
  let delList = [];
  do {
      answer += delList.length;
      delList.map(key => {
          board.map(row => {
              for(let k = 0; k < row.length; k++){
                  if (row[k] === key) row[k] = 0;
              }
              return row;
          });
          blocks.delete(key);
      });
      //console.log(board)
      let tmpBoard = board.map(v => v.slice());
      let newBoard = snow(snow(tmpBoard));
      delList = delCheck(newBoard, blocks);
      //console.log('del', delList)
  } while (delList.length !== 0)
  return answer;
}

const delCheck = (board, blocks) => {
  let result = [];
  [...blocks.keys()].map(key => {
      let minX = 201;
      let minY = 201;
      let maxX = -1;
      let maxY = -1;
      //console.log(key, blocks.get(key));
      const points = blocks.get(key);
      points.map(([x, y]) => {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
      })

      let isRect = true;
      for(let i = minX; i <= maxX; i++) {
          for(let j = minY; j <= maxY; j++) {
              if (board[i][j] !== key && board[i][j] !== -1) {
                  isRect = false;
              }
          }
      }
      if (isRect) result.push(key);
  })
  return result;
}

const snow = (board) => {
  const n = board.length;
  for(let j = 0; j < n; j++){
      for(let i = 0; i < n; i++){
          if (i === 0 && board[i][j] !== 0) break;
          else if (i === n - 1 || board[i+1][j] !== 0) {
              board[i][j] = -1;
              break;
          }
      }
  }
  //console.log(board)
  return board;
}