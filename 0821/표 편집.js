solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z", "U 1", "C", "C", "C", "C", "C", "C", "Z", "Z", "Z", "Z"])

var idx;
var answerTable;
var deleteStack;

function solution(n, k, cmd) {
    var answer = new Array(n);
    answer.fill('X');
    deleteStack = [];
    idx = k;
    answerTable = '';
    for (let i = 0; i < n; i++)
        answerTable += i.toString();
    cmd.map(command => process(command));
    
    for(let i = 0; i < answerTable.length; i++)
        answer[Number(answerTable[i])] = 'O';
    return answer.join('');
}

function process(cmd){
    const cmdParse = cmd.split(' ');
    let cmdType;
    let num; 
    cmdParse.length === 2 ? [cmdType, num] = cmdParse : cmdType = cmdParse[0];
    if (cmdType === 'U') {
        idx -= Number(num);
    }
    else if (cmdType === 'D') {
        idx += Number(num);
    }
    else if (cmdType === 'C') {
        deleteStack.push(answerTable[idx]);
        if (idx === answerTable.length-1){
            answerTable = answerTable.slice(0, idx);
            idx -= 1;
        }
        else
            answerTable = answerTable.slice(0, idx) + answerTable.slice(idx+1);
    }
    else if (cmdType === 'Z') {
        const revertId = Number(deleteStack.pop());
        const insertIdx = findIdx(revertId, answerTable)

        if (insertIdx <= idx) idx += 1;
        answerTable = answerTable.slice(0, insertIdx) + revertId + answerTable.slice(insertIdx);
    }
}

function findIdx(val, arr){
    let mid = parseInt((arr.length-1) / 2);
    const leftEnd = Number(arr[mid]);
    const rightStart = Number(arr[mid+1]);
    if (arr.length === 1){
        if (val < arr[0])
            return 0;
        else return 1;
    }
    if (val < leftEnd){
        arr = arr.slice(0, mid+1);
        mid = findIdx(val, arr);
    }
    else if (val > rightStart) {
        arr = arr.slice(mid+1);
        let add = findIdx(val, arr);
        mid += add + 1;
    }
    else {
        return mid+1;
    }
    return mid;
}

// function solution(n, k, cmd) {
//     var answer = new Array(n);
//     answer.fill('O');
//     var answerLeft = [];
//     for(let i = 0; i < n; i++)
//         answerLeft.push(i);
    
//     let deleteStack = [];
//     let idx = k;
//     cmd.map(command => [answer, idx, deleteStack, answerLeft] = process(command, answer, idx, deleteStack, answerLeft))
//     return answer.join('');
// }

// function process(cmd, answer, idx, deleteStack, answerLeft){
//     const cmdParse = cmd.split(' ');
//     let cmdType;
//     let num; 
    
//     cmdParse.length === 2 ? [cmdType, num] = cmdParse : cmdType = cmdParse[0];
//     if (cmdType === 'U') {
//         for(let i = 0; i < Number(num); i++)
//             if (answer[--idx] === 'X') idx = moveUp(idx, answer);
//     }
//     else if (cmdType === 'D') {
//         for(let i = 0; i < Number(num); i++)
//             if (answer[++idx] === 'X') idx = moveDown(idx, answer);
//     }
//     else if (cmdType === 'C') {
//         answer[idx] = 'X';
//         deleteStack.push(idx);
//         idx = moveDown(idx, answer);
//         answerLeft.splice(idx, 1);
//     }
//     else if (cmdType === 'Z') {
//         const revertIdx = deleteStack.pop();
//         answer[revertIdx] = 'O';
//     }
//     console.log(cmd)
//     console.log(idx)
//     console.log(answerLeft.join(''))
//     console.log(answer.join(''))
//     return [answer, idx, deleteStack, answerLeft];
// }

// function findIdx(val, arr){
//     let idx = parseInt(arr.length / 2);
//     if (val > arr[idx] && val < arr[idx+1])
//         return idx+1;
//     if (val < arr[idx]){
//         arr = arr.slice(idx);
//     }
//     else{
//         arr = arr.slice(0, idx);
//     }
//     idx = findIdx(val, arr);
// }

// function moveUp(idx, answer){
//     while (answer[idx] !== 'O') idx--;
//     return idx;
// }

// function moveDown(idx, answer){
//     while (idx < answer.length && answer[idx] !== 'O') idx++;
//     if (idx === answer.length) idx = moveUp(idx, answer)
//     return idx;
// }