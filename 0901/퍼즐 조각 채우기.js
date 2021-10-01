function solution(game_board, table) {
  var answer = 0;
  const n = game_board.length;
  const board = game_board.map(v => v.slice())
  let blankList = [];
  for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
          let blank = [];
          let queue = [];
          if (game_board[i][j] === 0) {
              queue.push([i, j]);
              while(queue.length !== 0) {
                  const [x, y] = queue.pop();
                  blank.push([x, y]);
                  game_board[x][y] = 1;
                  if (y < n-1 && game_board[x][y+1] === 0) queue.push([x, y+1]);
                  if (x < n-1 && game_board[x+1][y] === 0) queue.push([x+1, y]);
                  if (y > 1 && game_board[x][y-1] === 0) queue.push([x, y-1]);
                  if (x > 1 && game_board[x-1][y] === 0) queue.push([x-1, y]);
              }
              blankList.push(blank);
          }
      }
  }

  let blockList = [];
  for (let i = 0; i < n; i++){
      for (let j = 0; j < n; j++) {
          let block = [];
          let queue = [];
          if (table[i][j] === 1) {
              queue.push([i, j]);
              while(queue.length !== 0) {
                  const [x, y] = queue.pop();
                  block.push([x, y]);
                  table[x][y] = 0;
                  if (y < n-1 && table[x][y+1] === 1) queue.push([x, y+1]);
                  if (x < n-1 && table[x+1][y] === 1) queue.push([x+1, y]);
                  if (y > 1 && table[x][y-1] === 1) queue.push([x, y-1]);
                  if (x > 1 && table[x-1][y] === 1) queue.push([x-1, y]);
              }
              blockList.push(block);
          }
      }
  }

  const blanks = new Map();
  const blocks = new Map();
  for(let i = 1; i <= 6; i++) {
      blanks.set(i, []);
      blocks.set(i, []);
  }
  blankList.map(blank => {
      const tempList = blanks.get(blank.length);
      tempList.push(blank);
  });
  blockList.map(block => {
      const tempList = blocks.get(block.length);
      tempList.push(block);
  });
  for (let i = 1; i <= 6; i++) {
      let blockUsed = [];
      let blankUsed = [];
      let blankN = blanks.get(i);
      let blockN = blocks.get(i);
      if (blankN.length !== 0 && blockN.length !==0) {
          blankN.forEach((blank, idx) => {
              let isFill = false;
              for (let j = 0; j < blockN.length; j++) {
                  if (j in blockUsed) break;
                  const x = blockN[j][0][0];
                  const y = blockN[j][0][1];
                  
                  blockN[j].map(block => {
                      block[0] -= x;
                      block[1] -= y;
                  })
                  // 4번 돌려서 확인하기
                  for (let k = 0; k < 4; k++) {
                      blockN[j].map(block => {
                          const tmp = block[1]
                          block[1] = -block[0];
                          block[0] = tmp;
                      })
                      blank.map(start => {
                          let cnt = 0;
                          blockN[j].map(block => {
                              const x = start[0] + block[0];
                              const y = start[1] + block[1];
                              if (x >= 0 && y >= 0 && x < n && y < n && board[x][y] === 0) {
                                  cnt++;
                              }
                          })
                          if (cnt === i) {
                              isFill = true;
                              blockUsed.push(j);
                              blankUsed.push(idx);
                          }
                      })
                  }
              }
              if (isFill) {
                  answer += i
              }
          })
      }
  }
  return answer;
}