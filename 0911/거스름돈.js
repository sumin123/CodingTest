function solution(n, money) {
  var answer = 0;
  answer = cal(n, money)
  return answer;
}

function cal(n, arr) {
  let result = 0;
  if (n < 1) {
    return 0;
  }
  else {
    for (let i = 0; i < arr.length; i++){
      if (arr[i] === n)
        result += 1;

      result += cal(n - arr[i], arr);
      
    }
  }
  console.log(n, result)
  return result;
}

console.log(solution(5, [1,2,5]));