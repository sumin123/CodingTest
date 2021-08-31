from collections import deque
from copy import deepcopy
def solution(n, weak, dist):
    answer = 0
    
    N = len(weak)
    M = len(dist)-1
    dist.sort()
    
    # visited = set()
    # for i in range(

    q = deque()
    q.append([M, set(), 0])
    
    
    while q:
        # print(q)
        cur_idx, cur_visited, cur_cnt = q.popleft()
        
        if len(cur_visited) == N:
            return cur_cnt
        
        if cur_idx == -1:
            continue
        
        cnt = 0
        
        for w in weak:
            
            if w in cur_visited:
                continue
                
            temp = set()
            new_visited = deepcopy(cur_visited)

            start = w
            
            for _ in range(dist[cur_idx]+1):
                if start == n:
                    start = 0
                if start in weak:
                    temp.add(start)  
                start += 1
            
            if cnt <= len(temp):
                cnt = len(temp)
                
                new_visited = new_visited.union(temp)
                if len(new_visited) >= len(temp):
                    q.append([cur_idx-1, new_visited, cur_cnt+1])
            
           # cnt = max(cnt, len(temp))
           # if cnt <= len(temp):
            # new_visited = new_visited.union(temp)
            
            
            
                
            
    
    return -1