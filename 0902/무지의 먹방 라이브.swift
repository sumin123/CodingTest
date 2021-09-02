import Foundation

func solution(_ food_times:[Int], _ k:Int64) -> Int {
    var dict: [Int64:Int64] = [:]
    let count = food_times.count
    var dicCount: Int64 = 0
    
    for i in 0..<count {
        var j: Int64 = Int64(i)
        while j < count*food_times[i] + i {
            dict[j] = Int64(i)
            j += Int64(count)
            dicCount += 1
        }
    }
    
//    print(dict[k+1])
    var answer = -1
    var keyCount: Int64 = -1
    for keys in dict.keys.sorted() {
        keyCount += 1
        if keyCount == k {
            answer = Int(dict[keys]!)+1
        }
    }
    
    return answer
}

