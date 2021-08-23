// 처음 1, 3번 테케에서 시간초과가 발생해 코드 수정할 부분을 찾았지만 찾지 못해 다시 시도해 보니 0.1초가 나오고 통과되었다..
// 가끔은 인터넷 또는 서버 상태에 따라 오답처리가 될 수도 있나 보다.
// pre/post order을 stack을 이용해 구현할 수는 없을까? 생각해보자.

import Foundation

func solution(_ nodeinfo:[[Int]]) -> [[Int]] {
    var nodeInfo = [[Int]] (repeating: [0, 0, 0], count: nodeinfo.count)
    for i in 0..<nodeinfo.count {
        nodeInfo[i][0] = nodeinfo[i][0]
        nodeInfo[i][1] = nodeinfo[i][1]
        nodeInfo[i][2] = i + 1
    }
    
    nodeInfo.sort() { $0[1] > $1[1] }
        
    let tree = Tree(nodeInfo[0])
    
    for i in 1..<nodeInfo.count {
        let currentTree = Tree(nodeInfo[i])
        let parent = tree.findParent(for: currentTree)
        if parent.x > currentTree.x {
            parent.leftTree = currentTree
        } else {
            parent.rightTree = currentTree
        }
    }
    
    var pre: [Int] = []
    var post: [Int] = []
    preorder(tree, answer: &pre)
    postorder(tree, answer: &post)
    
    return [pre, post]
}

class Tree {
    var x: Int
    var y: Int
    var num: Int
    var leftTree: Tree?
    var rightTree: Tree?
    
    init (_ info: [Int]) {
        self.x = info[0]
        self.y = info[1]
        self.num = info[2]
    }
    
    func findParent (for tree: Tree) -> Tree {
        var parent: Tree = self
        while parent.y > tree.y {
            let tempParent: Tree? = parent.x > tree.x ? parent.leftTree : parent.rightTree
            
            if let notNul = tempParent {
                parent = notNul
            } else {
                break
            }
        }
        
        return parent
    }
}

func preorder (_ tree: Tree, answer: inout [Int]) {
    answer.append(tree.num)
    
    if let left = tree.leftTree {
        preorder(left, answer: &answer)
    }
    
    if let right = tree.rightTree {
        preorder(right, answer: &answer)
    }
}

func postorder (_ tree: Tree, answer: inout [Int]) {
    if let left = tree.leftTree {
        postorder(left, answer: &answer)
    }
    
    if let right = tree.rightTree {
        postorder(right, answer: &answer)
    }
    
    answer.append(tree.num)
}
