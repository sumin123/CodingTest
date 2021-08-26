from collections import deque
from copy import deepcopy
  
# 재귀한도 때문에 런타임 에러
import sys
sys.setrecursionlimit(10**6)
def solution(board, r, c):
    
        
    def move(direction, r, c):
        nr, nc = r, c
        if direction == 'UP':
            while nr > 0:
                nr -= 1
                if board[nr][nc] != 0:
                    return [nr, nc]
        
        elif direction == 'DOWN':
            while nr < N-1:
                nr += 1
                if board[nr][nc] != 0:
                    return [nr, nc]
        
        elif direction == 'LEFT':
            while nc > 0:
                nc -= 1
                if board[nr][nc] != 0:
                    return [nr, nc]
                
        elif direction == 'RIGHT':
            while nc < N-1:
                nc += 1
                if board[nr][nc] != 0:
                    return [nr, nc]
        
        else:
            dr, dc = direction
            if 0 <= nr+dr < N and 0 <= nc+dc < N: 
                return [nr+dr, nc+dc]
            return [nr, nc]
                
        return [nr, nc]
    
    def BFS(board, r, c, cnt):
        
        card = -1
        for i in range(N):
            for j in range(N):
                if board[i][j] != 0:
                    break
            break
        else:
            return "answer", cnt
        
        new_board = deepcopy(board)
        if new_board[r][c] != 0:
            card = new_board[r][c]
            cnt += 1
        
        for dir in directions:
            nr, nc = move(dir, r, c)
            if (nr, nc) == (r, c):
                continue
            cnt += 1
            
            # print(nr, nc)
            if new_board[nr][nc] == card:
                cnt += 1
                new_board[r][c] = 0
                new_board[nr][nc] = 0
                # print(new_board, cnt)
                BFS(new_board, nr, nc, cnt)
            else:
                BFS(new_board, nr, nc, cnt)
        
        
        
    answer = 0
    N = len(board)
    
    
    cards = set()
    directions = ['UP', 'DOWN', 'LEFT', 'RIGHT', (-1,0), (1,0), (0,-1), (0,1)]
    
    print(BFS(board, r, c, 0))
    # print(board)


    
    
    return answer
