function solution(n, t, m, timetable) {
    var answer = '';
    let busTimes = [];
    let passengerTimes = [];
    let busPassengerList = [];
    timetable.map(time => passengerTimes.push(Number(time.split(":")[0])*60 + Number(time.split(":")[1])))
    passengerTimes = passengerTimes.sort(function(a, b) {
        return a - b;
    });
    for(let i = 0; i < n; i++){
        busTimes.push(540 + i * t)
        busPassengerList.push([]);
    }
    let i = 0;
    let busIdx = 0;
    while (i < passengerTimes.length) {
        let personCnt = 0;
        while (passengerTimes[i] <= busTimes[busIdx] && personCnt < m) {
            personCnt++;
            busPassengerList[busIdx].push(passengerTimes[i]);
            i++;
        }
        busIdx++;
        if(busIdx === busTimes.length) break;
    }
    let last = n - 1;
    if(busPassengerList[last].length !== m){   //마지막 버스가 비어있는 경우
        answer = String(Math.floor(busTimes[last]/60)).padStart(2, '0')+':'+String(Math.floor(busTimes[last]%60)).padStart(2, '0');
    }
    else {
        let max = 0;
        busPassengerList[last].map(el => {
            if (el > max) max = el;
        })
        answer = String(Math.floor((max-1)/60)).padStart(2, '0')+':'+String(Math.floor((max-1)%60)).padStart(2, '0');
    }

    console.log(answer)
    return answer;
}