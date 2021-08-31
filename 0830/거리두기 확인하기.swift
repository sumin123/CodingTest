// 평범한 bfs

import Foundation

let dRow = [-1, 1, 0, 0]
let dCol = [0, 0, -1, 1]

func solution(_ places:[[String]]) -> [Int] {
    var answer: [Int] = []
    
    one: for map in places {
        
        for i in 0..<map.count {
            for j in 0..<map[i].count {
                let char = map[i][map[i].index(map[i].startIndex, offsetBy: j)]
                if char == "P", !bfs(map: map, row: i, col: j) {
                    answer.append(0)
                    continue one
                }
                
            }
        }
        answer.append(1)
        
    }
    
    return answer
}

func bfs (map: [String], row: Int, col: Int) -> Bool {
    var answer = true
    var queue = Queue<[Int]>()
    var check = [[Bool]] (repeating: [Bool] (repeating: false, count: 5), count: 5)
    
    queue.add([row, col, 0])
    check[row][col] = true
    
    one: while !queue.isEmpty() {
        let current = queue.poll()
        if current[2] == 2 { continue }
        
        for i in 0...3 {
            let nRow = current[0] + dRow[i]
            let nCol = current[1] + dCol[i]
            
            if nRow < 0 || nCol < 0 || nRow >= 5 || nCol >= 5 { continue }
            if check[nRow][nCol] { continue }
            let char = map[nRow][map[nRow].index(map[nRow].startIndex, offsetBy: nCol)]
            
            if char == "X" { continue }
            else if char == "P" {
                answer = false
                break one
            }
            
            queue.add([nRow, nCol, current[2] + 1])
            check[nRow][nCol] = true
        }
    }
    
    return answer
}

struct Queue<T> {
    private var right: [T] = []
    private var left: [T] = []
    
    mutating func add (_ item: T) {
        right.append(item)
    }
    
    mutating func poll () -> T {
        if left.count == 0 {
            left = right.reversed()
            right.removeAll()
        }
        
        return left.removeLast()
    }
    
    func isEmpty () -> Bool {
        return left.isEmpty && right.isEmpty
    }
}

