from collections import deque 
def solution(board):
    answer = []
    
    N = len(board)
    dir = [[(-1,0), (1,0)], [(0, -1), (0,1)]] # Up, Down, Left, Right
    costs = (100, 600) # Corner, Straight
    visited = [[[False for _ in range(2)] for _ in range(N)] for _ in range(N)]
    q = deque()
    q.append([0,0,-1,0]) # row, column, direction(0=Vertical, 1=Horizontal), sum_cost
    
    
    while q:
        cur_r, cur_c, direction, sum = q.popleft()
        # 결승점 도착
        if cur_r == N-1 and cur_c == N-1:
            answer.append(sum)
            continue
        
        # 수직방향 이동 검사
        for dr, dc in dir[0]:
            nr, nc = cur_r+dr, cur_c+dc
            if 0 <= nr < N and 0 <= nc < N:
                if not visited[nr][nc][0] and board[nr][nc] == 0:
                    visited[nr][nc][0] = True
                    if direction == -1 or direction == 0: # 첫 이동이거나 수직이동 중이었던 경로의 경우
                        q.append([nr,nc,0,sum+costs[0]])
                    else:
                        q.append([nr,nc,0,sum+costs[1]]) # 꺾이는 지점
        
        # 수평방향 이동 검사
        for dr, dc in dir[1]:
            nr, nc = cur_r+dr, cur_c+dc
            if 0 <= nr < N and 0 <= nc < N:
                if not visited[nr][nc][1] and board[nr][nc] == 0:
                    visited[nr][nc][1] = True
                    if direction == -1 or direction == 1: # 첫 이동이거나 수평이동 중이었던 경로의 경우
                        q.append([nr,nc,1,sum+costs[0]])
                    else:
                        q.append([nr,nc,1,sum+costs[1]]) # 꺾이는 지점
        
                        
        
        # for i in range(4):
        #     dr, dc, cost = dir[i][0], dir[i][1], costs[i]
        #     nr, nc = cur_r+dr, cur_c+dc
        #     if 0 <= nr < N and 0 <= nc < N:
        #         if not visited[nr][nc][i] and board[nr][nc] == 0:
        #             visited[nr][nc][i] = True
        #             q.append([nr,nc,total+cost])
        # print(q)
    print(visited)
    
    return min(answer)