function solution(gems) {
    var answer = [];
    let startIdx = 0;
    let endIdx = 0;
    let gemKind = new Map();
    for(let i = 0; i < gems.length; i++){
        gemKind.set(gems[i], 1);
    }
    const numGems = gemKind.size;
    let answerLen = Number.MAX_SAFE_INTEGER;
    let myNumGems = 1;
    let myGems = new Map();
    myGems.set(gems[0], 1);
    for (; endIdx < gems.length; endIdx++){
        if (myNumGems === numGems && answerLen > endIdx - startIdx) {
            answerLen = endIdx - startIdx;
            answer = [startIdx+1, endIdx+1];
        }
        if (gems[startIdx] === gems[endIdx+1]){ //새로 들어오는 원소가 제일 앞 원소와 같은 경우
            startIdx += 1;
            while(startIdx < endIdx && myGems.get(gems[startIdx]) !== 1){
                myGems.set(gems[startIdx], myGems.get(gems[startIdx])-1);
                startIdx += 1;
            }
        }
        else { //새로 들어오는 원소가 제일 앞 원소와 다른 경우
            let origin = myGems.get(gems[endIdx+1]);
            if (origin === undefined) origin = 0;
            myGems.set(gems[endIdx+1], origin+1);
            myNumGems = myGems.size;
        }
    }
    
    return answer;
}