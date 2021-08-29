function solution(user_id, banned_id) {
    var answer = 0;
    var banList = {};
    var banCandName = {};
    var bannedList = [];
    let banIdx = 0;
    let banMaxIdx = [];
    let indexLimit = [];

    banned_id.map(banId => {
        let num = 0;
        bannedList.push([]);
        for (let i = 0; i < user_id.length; i++){
            if (FitCondition(user_id[i], banId)){
                bannedList[banIdx].push(user_id[i]);
                num++;
            }
        }
        banMaxIdx.push(num);
        indexLimit.push(num-1);
        banIdx += 1;
    });

    let idxList = new Array(banMaxIdx.length).fill(0);
    let answerList = [];

    while (idxList !== 0){
        let comb = new Set();
        let test = [];
        for(let i = 0; i < idxList.length; i++){
            comb.add(bannedList[i][idxList[i]]);
            test.push(bannedList[i][idxList[i]]);
        }
        if (comb.size === idxList.length) {
            if (answerList.every(ans => JSON.stringify(ans) !== JSON.stringify(test.sort()))){
                answerList.push(test.sort());
                // console.log(idxList)
                // console.log(test.sort())
                // console.log(answerList.length)
                // console.log()
            }
        }
        idxList = idxIncrease(idxList, banMaxIdx, indexLimit);
    }
    
    return answerList.length;
}

function idxIncrease(idxList, idxMaxList, indexLimit){
    if (JSON.stringify(indexLimit) === JSON.stringify(idxList)) return 0;
    idxList[idxList.length - 1] += 1;
    for(let i = idxList.length - 1; i >= 0; i--){
        if(idxList[i] === idxMaxList[i]) {
            idxList[i] = 0;
            idxList[i-1] += 1;
        }
    }
    
    return idxList;
}

function FitCondition(word, cond){
    if (word.length !== cond.length) return false;
    let isFit = true;
    for (let i = 0; i < word.length; i++){
        if (cond[i] !== '*' && cond[i] !== word[i]){
            isFit = false;
            break;
        }
    }
    return isFit;
}