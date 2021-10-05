function solution(board) {
  var answer = 0;
  const len = board.length;
  let board0 = board.map(v => v.slice());
  let board1 = board.map(v => v.slice());
  board0[0][0] = 1
  const q = new Queue();
  let state = [[0, 0], [0, 1], 0, 0];
  q.push(state);

  while(true) {
      state = q.pop();
      const cnt = state[3];
      console.log(state[0], state[1], cnt)
      if (isFinish(state, len)) {
          answer = cnt;
          break;
      }
      if (state[2] === 0) {
          const row = state[0][0];
          const leftCol = state[0][1];
          const rightCol = state[1][1];
          //board0[row][leftCol] = 1;
          if (rightCol < len-1 && board[row][rightCol+1] === 0 && board0[row][leftCol+1] === 0) {
              q.push([[row, leftCol+1], [row, rightCol+1], 0, cnt+1]);
              board0[row][leftCol+1] = 1;
          }
          if (row < len-1 && board[row+1][leftCol] === 0 && board[row+1][rightCol] === 0 && board0[row+1][leftCol] === 0){
              q.push([[row+1, leftCol], [row+1, rightCol], 0, cnt+1]);
              board0[row+1][leftCol] = 1;
          }
          if (leftCol > 0 && board[row][leftCol-1] === 0 && board0[row][leftCol-1] === 0) {
              q.push([[row, leftCol-1], [row, rightCol-1], 0, cnt+1]);
              board0[row][leftCol-1] = 1;
          }
          if (row > 0 && board[row-1][leftCol] === 0 && board[row-1][rightCol] === 0 && board0[row-1][leftCol] === 0){
              q.push([[row-1, leftCol], [row-1, rightCol], 0, cnt+1]);
              board0[row-1][leftCol] = 1;
          }
          
          if (row > 0 && board[row-1][leftCol] === 0 && board[row-1][rightCol] === 0 && board1[row-1][rightCol] === 0){
              q.push([[row-1, rightCol], [row, rightCol], 1, cnt+1]);
              board1[row-1][rightCol] = 1;
          }
          if (row > 0 && board[row-1][leftCol] === 0 && board[row-1][rightCol] === 0 && board1[row-1][leftCol] === 0){
              q.push([[row-1, leftCol], [row, leftCol], 1, cnt+1]);
              board1[row-1][leftCol] = 1;
          }
          if (row < len - 1 && board[row+1][leftCol] === 0 && board[row+1][rightCol] === 0 && board1[row][rightCol] === 0){
              q.push([[row, rightCol], [row+1, rightCol], 1, cnt+1]);
              board1[row][rightCol] = 1;
          }
          if (row < len - 1 && board[row+1][leftCol] === 0 && board[row+1][rightCol] === 0 && board1[row][leftCol] === 0){
              q.push([[row, leftCol], [row+1, leftCol], 1, cnt+1]);
              board1[row][leftCol] = 1;
          }
      }
      else if (state[2] === 1) {
          const col = state[0][1];
          const upRow = state[0][0];
          const downRow = state[1][0];
          //board1[upRow][col] = 1;
          if (downRow < len-1 && board[downRow+1][col] === 0 && board1[upRow+1][col] === 0) {
              q.push([[upRow+1, col], [downRow+1, col], 1, cnt+1]);
              board1[upRow+1][col] = 1;
          }
          if (col < len-1 && board[upRow][col+1] === 0 && board[downRow][col+1] === 0 && board1[upRow][col+1] === 0){
              q.push([[upRow, col+1], [downRow, col+1], 1, cnt+1]);
              board1[upRow][col+1] = 1;
          }
          if (upRow > 0 && board[upRow-1][col] === 0 && board1[upRow-1][col] === 0) {
              q.push([[upRow-1, col], [downRow-1, col], 1, cnt+1]);
              board1[upRow-1][col] = 1;
          }
          if (col > 0 && board[upRow][col-1] === 0 && board[downRow][col-1] === 0 && board1[upRow][col-1] === 0){
              q.push([[upRow, col-1], [downRow, col-1], 1, cnt+1]);
              board1[upRow][col-1] = 1;
          }
          
          if (col > 0 && board[upRow][col-1] === 0 && board[downRow][col-1] === 0 && board0[upRow][col-1] === 0){
              q.push([[upRow, col-1], [upRow, col], 0, cnt+1]);
              board0[upRow][col-1] = 1;
          }
          if (col > 0 && board[upRow][col-1] === 0 && board[downRow][col-1] === 0 && board0[downRow][col-1] === 0){
              q.push([[downRow, col-1], [downRow, col], 0, cnt+1]);
              board0[downRow][col-1] = 1;
          }
          if (col < len - 1 && board[upRow][col+1] === 0 && board[downRow][col+1] === 0 && board0[upRow][col] === 0){
              q.push([[upRow, col], [upRow, col+1], 0, cnt+1]);
              board0[upRow][col] = 1;
          }
          if (col < len - 1 && board[upRow][col+1] === 0 && board[downRow][col+1] === 0 && board0[downRow][col] === 0){
              q.push([[downRow, col], [downRow, col+1], 0, cnt+1]);
              board0[downRow][col] = 1;
          }
      }
  }
  return answer;
}

function isFinish(state, len) {
  return JSON.stringify(state[0]) === JSON.stringify([len-1, len-1]) || JSON.stringify(state[1]) === JSON.stringify([len-1, len-1]);
}

class Queue {
  constructor() {
      this.in_q = [];
      this.out_q = [];
  }
  push(el) {
      this.in_q.push(el)
  }
  pop() {
      if (this.out_q.length === 0) {
          while(this.in_q.length !== 0) {
              this.out_q.push(this.in_q.pop());
          }
      }
      return this.out_q.pop();
  }
  get length() {
      return this.in_q.length + this.out_q.length;
  }
}

console.log(solution(	[[0, 0, 0, 1, 1], [0, 0, 0, 1, 0], [0, 1, 0, 1, 1], [1, 1, 0, 0, 1], [0, 0, 0, 0, 0]]));