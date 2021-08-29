// 엣지 케이스들 (09:00이 마지막 버스인데, 이전 사람들이 버스 최대 수용수보다 적을 경우) 등을 제대로 확인하자

import Foundation

func solution(_ n:Int, _ t:Int, _ m:Int, _ timetable:[String]) -> String {
    var timeList: [Int] = []
    var timeListIndex: Int = 0
    var timeListCount = 0
    
    for time in timetable {
        let temp = str2min (time)
        timeList.append(temp)
        timeListCount += 1
    }
    timeList.sort(by: <)
    
    var currentTime = str2min ("09:00")
    
    for q in 0..<n {
        var remain = m
        
        while timeListIndex < timeListCount {
            if timeList[timeListIndex] <= currentTime {
                remain -= 1
                timeListIndex += 1
                if remain == 0 { break }
            } else { break }
        }
        
        if q == n-1 && remain != 0 {
            return min2str (currentTime)
        }
        
        currentTime += t
        
    }
    
    while timeListIndex - 2 >= 0, timeList[timeListIndex-1] == timeList[timeListIndex-2] {
        timeListIndex -= 1
    }
    
    let answerTime = timeList[timeListIndex-1] - 1
    print(answerTime)
    
    return min2str (answerTime)
}

func str2min (_ time: String) -> Int {
    var answer = 0
    
    let hourStart = time.startIndex
    let hourEnd = time.index(hourStart, offsetBy: 1)
    let minStart = time.index(hourStart, offsetBy: 3)
    let minEnd = time.index(hourStart, offsetBy: 4)
    
    let hour = Int(time[hourStart...hourEnd])
    let min = Int(time[minStart...minEnd])
    
    if let H = hour, let M = min {
        answer = H*60 + M
    }
    
    return answer
}

func min2str (_ time: Int) -> String {
    var hour: String = String(time/60)
    var min: String = String(time%60)
    
    while hour.count < 2 {
        hour = "0" + hour
    }
    while min.count < 2 {
        min = "0" + min
    }
    
    return hour + ":" + min
}
