# 재귀한도 때문에 런타임 에러
import sys
sys.setrecursionlimit(10**6)

def solution(nodeinfo):
    answer = []
    N = len(nodeinfo)
    # 인덱스 추가
    for i in range(N):
        nodeinfo[i].append(i+1)
    # 높이 순으로 정렬
    nodeinfo = sorted(nodeinfo, key=lambda x: [-x[1], x[0]])

    # 트리 객체 생성
    tree = BTree()
    # 트리에 Node 삽입
    for i in range(N):
        node = Node(nodeinfo[i])
        tree.insert(node)

    answer.append(tree.preorder()) # 전위 순회
    answer.append(tree.postorder(tree.root, [])) # 후위 순회
    
    return answer

# 노드 클래스
class Node:
    def __init__(self, data):
        self.x = data[0]
        self.y = data[1]
        self.idx = data[2]
        self.left = None
        self.right = None
    
# 이진 트리 클래스
class BTree:
    def __init__(self):
        self.root = None
    
    def insert(self, node):
        if self.root is None: # 높이순으로 정렬했으니 맨 처음 들어오는 놈이 root이다.
            self.root = node
            return
        else: # 높이순 정렬이니 x 위치 기준으로 left, right 삽입
            cur_node = self.root
            while True:                
                if cur_node.x > node.x:
                    if cur_node.left:
                        cur_node = cur_node.left
                    else:
                        cur_node.left = node
                        return
                else:
                    if cur_node.right:
                        cur_node = cur_node.right
                    else:
                        cur_node.right = node
                        return

    def preorder(self):
        stack = [self.root]
        visited = []
        
        while stack:
            cur_node = stack.pop()
            visited.append(cur_node.idx)
            
            if cur_node.right:
                stack.append(cur_node.right)
            if cur_node.left:
                stack.append(cur_node.left)
        
        return visited
    
    def postorder(self, node, visited):
        
        # 재귀 방식
        if node is None:
            return
        
        self.postorder(node.left, visited)
        self.postorder(node.right, visited)
        visited.append(node.idx)
        return visited
        
        # 반복 방식 (원래 LRN 인데 NRL로 방문한 다음 reverse)
        
#         stack = [self.root]
#         visited = []
        
#         while stack:
#             cur_node = stack.pop()
#             visited.append(cur_node.idx)
            
#             if cur_node.left:
#                 stack.append(cur_node.left)
#             if cur_node.right:
#                 stack.append(cur_node.right)
        
#         return visited[::-1]