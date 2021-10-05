function solution(places) {
  var answer = [];
  places.map(place => {
      let persons = [];
      for(let i = 0; i < place.length; i++) {
          for(let j = 0; j < place[i].length; j++) {
              if (place[i][j] === 'P') {
                  persons.push([i, j]);
              }
          }
      }
      let isGood = true;
      const combList = combination(persons, 2);
      for(let i = 0; i < combList.length; i++) {
          const comb = combList[i];
          if (distCheck(comb[0], comb[1], place) === false) {
              answer.push(0);
              isGood = false;
              break;
          }
      }
      if (isGood) answer.push(1);
  })
  return answer;
}

function distCheck(pos1, pos2, board) {
  const [x1, y1] = pos1;
  const [x2, y2] = pos2;
  
  if (Math.abs(x1 - x2) + Math.abs(y1 - y2) > 2) return true;
  else if (Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1) return false;
  else if (x1 === x2) {
      if (board[x1][Math.floor((y1 + y2) / 2)] === 'X') return true;
  }
  else if (y1 === y2) {
      if (board[Math.floor((x1 + x2) / 2)][y1] === 'X') return true;
  }
  else if (board[x1][y2] === 'X' && board[x2][y1] === 'X') return true;
  return false;
}

function combination(arr, numSelect) {
  let result = [];
  if (numSelect === 1) return arr.map(el => [el])
  
  arr.forEach((v, idx, arr) => {
      const fixed = v;
      const restArr = arr.slice(idx+1);
      const combArr = combination(restArr, numSelect - 1);
      const combined = combArr.map((v) => [fixed, ...v]);
      result.push(...combined);
  })
  return result;
}