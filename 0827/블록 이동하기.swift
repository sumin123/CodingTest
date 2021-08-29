// 단순 구현인데 너무 햇갈렸다...

import Foundation

let dRow: [Int] = [-1, 1, 0, 0]
let dCol: [Int] = [0, 0, -1, 1]

func solution(_ board:[[Int]]) -> Int {
    var answer: Int = 0
    let size = board.count
    
    var checkBoard = [[[Bool]]] (repeating: [[Bool]] (repeating: [false, false], count: size), count: size)
    
    var queue = Queue<[Int]>() // [row1, col1, row2, col2, state, moveCount], ㅡ: state 0, ㅣ: state 1
    queue.add([0,0,0,1,0,0])
    checkBoard[0][0][0] = true
    checkBoard[0][1][0] = true
    
    while !queue.isEmpty() {
        let current = queue.poll()
        
        var t = board
        t[current[0]][current[1]] = 2
        t[current[2]][current[3]] = 2
        
        if (current[0] == size-1 && current[1] == size-1) || (current[2] == size-1 && current[3] == size-1) {
            answer = current[5]
            break
        }
        
        for i in 0...3 {
            let row1 = current[0] + dRow[i]
            let col1 = current[1] + dCol[i]
            let row2 = current[2] + dRow[i]
            let col2 = current[3] + dCol[i]
            let state = current[4]
            let count = current[5]
            
            if row1 < 0 || col1 < 0 || row2 < 0 || col2 < 0 { continue }
            if row1 >= size || col1 >= size || row2 >= size || col2 >= size { continue }
            if board[row1][col1] == 1 || board[row2][col2] == 1 { continue }
            if checkBoard[row1][col1][state] && checkBoard[row2][col2][state] { continue }
            
            queue.add([row1, col1, row2, col2, state, count+1])
            checkBoard[row1][col1][state] = true
            checkBoard[row2][col2][state] = true
        }
        
        let turnTemp = turn(board: board, current: current, checkBoard: &checkBoard)
        for temp in turnTemp {
            queue.add(temp)
        }
    }
    

    return answer
}

func turn (board: [[Int]], current: [Int], checkBoard: inout [[[Bool]]]) -> [[Int]] {
    var answer: [[Int]] = []
    
    if current[4] == 0 {
        answer = ㅣ로변경(board: board, current: current, checkBoard: &checkBoard)
    } else {
        answer = ㅡ로변경(board: board, current: current, checkBoard: &checkBoard)
    }
    return answer
}

func canTurn (board: [[Int]], checkBoard: inout [[[Bool]]], answer: inout [[Int]], count: Int, row1: Int, col1: Int, row2: Int, col2: Int, state: Int) {
    
    if board[row1][col1] != 1 && board[row2][col2] != 1 {
        if !checkBoard[row1][col1][state] || !checkBoard[row2][col2][state] {
            answer.append([row1, col1, row2, col2, state, count+1])
            checkBoard[row1][col1][state] = true
            checkBoard[row2][col2][state] = true
        }
    }
}

func ㅡ로변경 (board: [[Int]], current: [Int], checkBoard: inout [[[Bool]]]) -> [[Int]] {
    var answer: [[Int]] = []
    
    let rightCol = current[1] + 1
    let leftCol = current[1] - 1
    let middleCol = current[1]
    let upRow = current[0]
    let downRow = current[2]
    
    if 0 <= rightCol && rightCol < board.count {
        if board[downRow][rightCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: upRow, col1: middleCol, row2: upRow, col2: rightCol, state: 0)
        }
        
        if board[upRow][rightCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: downRow, col1: middleCol, row2: downRow, col2: rightCol, state: 0)
        }
    }
    
    if 0 <= leftCol && leftCol < board.count {
        if board[downRow][leftCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: upRow, col1: leftCol, row2: upRow, col2: middleCol, state: 0)
        }
        
        if board[upRow][leftCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: downRow, col1: leftCol, row2: downRow, col2: middleCol, state: 0)
        }
    }
    
    return answer
}


func ㅣ로변경 (board: [[Int]], current: [Int], checkBoard: inout [[[Bool]]]) -> [[Int]] {
    var answer: [[Int]] = []
    
    let upRow = current[0] - 1
    let downRow = current[0] + 1
    let middleRow = current[0]
    let leftCol = current[1]
    let rightCol = current[3]
        
    if 0 <= upRow && upRow < board.count {
        if board[upRow][rightCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: upRow, col1: leftCol, row2: middleRow, col2: leftCol, state: 1)
        }
        if board[upRow][leftCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: upRow, col1: rightCol, row2: middleRow, col2: rightCol, state: 1)
        }
    }
    
    if 0 <= downRow && downRow < board.count {
        if board[downRow][rightCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: middleRow, col1: leftCol, row2: downRow, col2: leftCol, state: 1)
        }
        if board[downRow][leftCol] != 1 {
        canTurn(board: board, checkBoard: &checkBoard, answer: &answer, count: current[5], row1: middleRow, col1: rightCol, row2: downRow, col2: rightCol, state: 1)
        }
    }
    
    return answer
}

struct Queue<T> {
    private var right: [T] = []
    private var left: [T] = []
    
    mutating func add (_ item: T) {
        self.right.append(item)
    }
    
    mutating func poll () -> T {
        if self.left.count == 0 {
            self.left = self.right.reversed()
            self.right.removeAll()
        }
        
        return self.left.removeLast()
    }
    
    func isEmpty () -> Bool {
        return self.left.count == 0 && self.right.count == 0
    }
}
