function solution(n, build_frame) {
  var answer = [];
  let col_map = Array.from(Array(n+1), () => new Array(n+1).fill(0));
  let row_map = Array.from(Array(n+1), () => new Array(n+1).fill(0));
  
  for (let i = 0; i < build_frame.length; i++){
      const [x, y, col, install] = build_frame[i];
      // 설치
      if (install === 1) {    
          if (col === 1) row_map[x][y] = 1;
          else col_map[x][y] = 1;
          if (valid_check(row_map, col_map) === false) {
              if (col === 1) row_map[x][y] = 0;
              else col_map[x][y] = 0;
          }
      }
      // 삭제
      else {
          if (col === 1)  row_map[x][y] = 0;
          else col_map[x][y] = 0;
          if (valid_check(row_map, col_map) === false) {
              if (col === 1) row_map[x][y] = 1;
              else col_map[x][y] = 1;
          }
      }
  }
  // make answer
  for (let x = 0; x < row_map.length; x++){   
      for (let y = 0; y < row_map.length; y++){
          if (col_map[x][y] === 1) {
              answer.push([x, y, 0])
          }
          if (row_map[x][y] === 1) {
              answer.push([x, y, 1])
          }
      }
  }
  return answer;
}

function valid_check(row_map, col_map) {
  for (let x = 0; x < row_map.length; x++){
      for (let y = 1; y < row_map.length; y++){
          // 보 체크
          if (row_map[x][y] === 1) {
              // 한쪽 끝 부분이 기둥 위에 있는 경우
              if (col_map[x][y-1] === 1 || col_map[x+1][y-1] === 1) continue;
              // 양쪽 끝이 다른 보와 연결된 경우
              else if ((x > 0 && row_map[x-1][y] === 1) && (x < row_map.length-1 && row_map[x+1][y] === 1)){
                      continue;
              }
              // 기준에 만족하지 않는 경우
              else {
                  return false;
              }
          }
          // 기둥 체크
          if (col_map[x][y] === 1) {
              // 다른 기둥 위에 있는 경우
              if (col_map[x][y-1] === 1){
                  continue;
              }
              // 보의 한쪽 끝 부분 위에 있는 경우
              else if ((x > 0 && row_map[x-1][y] === 1) || (x < row_map.length-1 && row_map[x][y] === 1))
                  continue;
              // 기준에 만족하지 않는 경우
              else {
                  return false;
              }
          }
      }
  }

  return true;
}