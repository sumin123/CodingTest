function solution(lines) {
    var answer = 0;
    let startTimeList = [];
    let endTimeList = [];
    lines.map(line => {
        const token = line.split(' ');
        const endTime = toMilliSec(token[1]);
        const startTime = endTime - Number(token[2].split('s')[0])*1000 + 1;
        startTimeList.push(startTime);
        endTimeList.push(endTime);
    });
    
    //end time 기준으로 1초 구간 검사
    endTimeList.map(endTime => {
        let taskNum = 0;
        for(let i = 0; i < startTimeList.length; i++){
            if (isInRange(startTimeList[i], endTimeList[i], endTime)) {
                taskNum += 1;
            }
        }
        if (taskNum > answer) answer = taskNum;
    })
    
    return answer;
}

function isInRange(startTime, endTime, rangeStartTime){
    const rangeEndTime = rangeStartTime + 999;
    // console.log(startTime)
    // console.log(endTime)
    // console.log(rangeStartTime)
    // console.log(rangeEndTime)
    if (endTime < rangeStartTime || startTime > rangeEndTime) return false;
    else return true;
}

//hh:mm:ss.sss 를 sec로 변환
function toMilliSec(time) {
    const timeToken = time.split(/\:|\./);
    const msTime = Number(timeToken[0])*1000*60*60 + Number(timeToken[1])*1000*60 + Number(timeToken[2])*1000 + Number(timeToken[3]);
    return msTime;
}