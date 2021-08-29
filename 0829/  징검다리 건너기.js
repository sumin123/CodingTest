function solution(stones, k) {
    var answer = 0;
    if (k == 1) return stones.reduce(function (prev, cur) {
        return prev < cur ? prev : cur
    });
    let localMax = stones.slice(0, k).reduce(function (prev, cur) {
        return prev > cur ? prev : cur
    });
    answer = localMax;
    for (let i=0; i < stones.length - k; i++){
       // console.log(localMax)
       if (stones[i] == localMax){
           localMax = stones.slice(i+1, i+k).reduce(function (prev, cur) {
                return prev > cur ? prev : cur
            });
        }
        if (stones[i + k] > localMax) localMax = stones[i + k];
        if (localMax < answer) {
            answer = localMax;
        }
    }
    return answer;
}