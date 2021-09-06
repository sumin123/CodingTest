// 투 포인터 알고리즘은 파악할 수 있었지만 start, end를 잡는 것 밑 검사를 하는 과정에서의 서순에 따라서 각 루프별
// start, end의 값의 상태가 바뀔 수 있었고, end == gems.count일 때의 엣지 케이스에서
// start를 1씩 늘려 가며 검사하지 않고 그대로 종료되는 엣지케이스를 생각하지 못했었다.

import Foundation

func solution(_ gems:[String]) -> [Int] {
    var gemDict: [String:Bool] = [:]
    var gemCount = 0
    for gem in gems {
        if gemDict[gem] == nil {
            gemCount += 1
            gemDict[gem] = true
        }
    }
    
    var start = 0
    var end = 0
    var currentDict: [String:Int] = [:]
    var currentCount = 0
    
    var answer = [0, gems.count]
    
    while start <= end && end < gems.count {
        if currentCount < gemCount {
            let gem = gems[end]
            
            if let _ = currentDict[gem] {
                currentDict[gem]! += 1
            } else {
                currentDict[gem] = 1
                currentCount += 1
            }
            
            end += 1
        } else if currentCount == gemCount {
            let gem = gems[start]
            
            if currentDict[gem]! > 1 {
                currentDict[gem]! -= 1
            } else if currentDict[gem] == 1{
                currentDict[gem] = nil
                currentCount -= 1
            }
            
            start += 1
        }
        
        if currentCount == gemCount {
            if (answer[1]-answer[0] == end-start-1 && answer[0] > start+1) || (answer[1]-answer[0] > end-start-1) {
                answer = [start+1, end]
            }
        }
    }
    
    while end == gems.count && currentCount == gemCount {
        let gem = gems[start]
        
        if currentDict[gem]! > 1 {
            currentDict[gem]! -= 1
        } else if currentDict[gem] == 1{
            currentDict[gem] = nil
            currentCount -= 1
        }
        
        start += 1
        
        if currentCount == gemCount {
            if (answer[1]-answer[0] == end-start-1 && answer[0] > start+1) || (answer[1]-answer[0] > end-start-1) {
                answer = [start+1, end]
            }
        }

    }
    
    return answer
}
