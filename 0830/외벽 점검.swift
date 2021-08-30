// point 1. 시계방향에서 검사하는 모든 경우의 수는 반시계방향에서도 검사한다 -> 시계나 반시계 하나만 검사
// point 2. 모든 경우의 수를 확인할 때 동일한 경우의 수를 반복적으로 구할 수도 있다 -> dict를 이용해 중복 제거(이게 가장 중요)

import Foundation

func solution(_ n:Int, _ weak:[Int], _ dist:[Int]) -> Int {
    var answer = 0
    
    var weakQueue = Queue<[Int]>()
    var distIndexQueue = Queue<(Int, Int)>()
    
    var dict: [[Int]:Bool] = [:]
    
    weakQueue.add(weak)
    distIndexQueue.add((dist.count-1, 0))
    
    one: while !weakQueue.isEmpty() {
        let currentWeak = weakQueue.poll()
        let (index, count) = distIndexQueue.poll()
                
        if index < 0 {
            answer = -1
            continue
        }
        
        for i in 0..<currentWeak.count {
            let clock = findClockMax(n: n, weak: currentWeak, index: i, max: dist[index])
//            let counterClock = findCounterClockMax(n: n, weak: currentWeak, index: i, max: dist[index])
//            if clock.isEmpty || counterClock.isEmpty {
            if clock.isEmpty {
                answer = count + 1
                break one
            } else if index == 0 {
                answer = -1
                continue
            }
            
            if dict[clock] == nil {
                dict[clock] = true
                weakQueue.add(clock)
                distIndexQueue.add((index-1, count+1))
            }
//            weakQueue.add(counterClock)
//            distIndexQueue.add((index-1, count+1))
        }
    }
    
    return answer
}

func findClockMax (n: Int, weak: [Int], index: Int, max: Int) -> [Int] {
    if weak.count <= 1 {
        return []
    }
    var answer = weak
    let count = answer.count
    
    var to = index - 1 < 0 ? count-1 : index-1
    while to != index {
        let dist = index < to ? weak[to] - weak[index] : weak[to] + n - weak[index]

        if dist <= max {
            if index < to { answer.removeSubrange(index...to) }
            else if to+1 > index-1 { answer = [] }
            else { answer = Array(answer[to+1...index-1]) }
            break
        }
        
        to = to-1 < 0 ? count-1 : to-1
    }
    
    if answer == weak {
        answer.remove(at: index)
    }
    
    return answer
}

//func findCounterClockMax (n: Int, weak: [Int], index: Int, max: Int) -> [Int] {
//    if weak.count <= 0 {
//        return []
//    }
//    var answer: [Int] = weak
//
//    var to = index + 1 >= weak.count ? 0 : index+1
//    while to != index {
//        let dist = to < index ? weak[index] - weak[to] : weak[index] + n - weak[to]
//
//        if dist <= max {
//            if index > to { answer.removeSubrange(to...index) }
//            else if index+1 > to-1 { answer = [] }
//            else { answer = Array(answer[index+1...to-1]) }
//            break
//        }
//
//        to = to+1 == weak.count ? 0 : to+1
//    }
//
//    return answer
//}

struct Queue<T> {
    private var right: [T] = []
    private var left: [T] = []
    
    mutating func add (_ item: T) {
        self.right.append(item)
    }
    
    mutating func poll () -> T {
        if self.left.count == 0 {
            left = right.reversed()
            right.removeAll()
        }
        
        return left.removeLast()
    }
    
    func isEmpty () -> Bool {
        return self.right.count == 0 && self.left.count == 0
    }
}
