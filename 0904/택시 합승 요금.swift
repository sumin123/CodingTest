import Foundation

func solution(_ n:Int, _ s:Int, _ a:Int, _ b:Int, _ fares:[[Int]]) -> Int {
    let matrix = floyd(fares: fares, n: n)
    var ret: Int = 10000000
    
    for i in 0..<n {
        ret = min(ret, matrix[s-1][i] + matrix[i][a-1] + matrix[i][b-1])
    }

    return ret
}

func floyd (fares: [[Int]], n: Int) -> [[Int]]{
    let inf: Int = 10000000
    var matrix: [[Int]] = [[Int]] (repeating: [Int] (repeating: inf, count: n), count: n)
    
    for i in 0..<n {
        matrix[i][i] = 0
    }
    
    for i in fares {
        let from: Int = i[0] - 1
        let to: Int = i[1] - 1
        let cost: Int = i[2]
        matrix[from][to] = cost
        matrix[to][from] = cost
    }

    for k in 0..<n {
        for i in 0..<n {
            for j in 0..<n {
                if matrix[i][j] > matrix[i][k] + matrix[k][j] {
                    matrix[i][j] = matrix[i][k] + matrix[k][j]
                }
            }
        }
    }

    return matrix
}
