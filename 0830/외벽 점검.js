function solution(n, weak, dist) {
  var answer = -1;
  const dst = dist.sort((a, b) => {
      if (a > b) return -1;
  });
  console.log(dst)
  const weakIdx = Array.from(Array(weak.length).keys())
  for(let i = 1; i <= dist.length; i++) {
      const startPoints = combination(weakIdx, i);
      startPoints.forEach((points, idx) => {
          let lenList = [];
          const startIdx = points[0];
          const endIdx = startIdx === 0 ? weak.length-1 : startIdx - 1;
          
          for(let j = 0; j < points.length - 1; j++) {
              let len = weak[points[j+1]-1] - weak[points[j]];
              if (len < 0) len += n;
              lenList.push(len);
          }
          let len = weak[endIdx] - weak[points[points.length - 1]];
          if (len < 0) len += n;
          lenList.push(len)
          lenList.sort((a, b)=>{
              if (a>b) return -1;
          })
          // console.log('points', points)
          // console.log('lenList', lenList)
          // console.log('dist', dst)
          let isSuccess = true;
          for (let j = 0; j < i; j++) {
              if (lenList[j] > dist[j]) {
                  isSuccess = false;
                  break;
              }
          }
          if (isSuccess) {
              answer = i;
          };
      });
      if (answer !== -1) break;
  }
  return answer;
}

const combination = (arr, num) => {
  let result = [];
  if (num === 1) return arr.map(v => [v]);
  arr.forEach((val, idx, arr) => {
      const fixed = val;
      const restArr = arr.slice(idx+1);
      const combinationArr = combination(restArr, num-1);
      const combineFix = combinationArr.map(v => [fixed, ...v]);
      result.push(...combineFix);
  })
  return result;
}