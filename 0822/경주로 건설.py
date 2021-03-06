from collections import deque

def solution(board):
    # 방문처리 전략 : Visited에 비용 저장 후 비용이 같거나 작은 경로가 찾아오면 갱신
    # 단, visited를 도달한 방향에 따라 구별해서 저장해야 함, 추후 이동방향에 따라서 더 싼 경우가 있기 때문
    answer = []
    
    N = len(board)
    visited = [[[False for _ in range(N)] for _ in range(N)] for _ in range(2)] # visited[i][r][c] == i 방향으로 r,c 에 방문여부(방문한 경우 최소비용)
    dirs = [[(-1,0), (1,0)], [(0,1), (0,-1)]] # UP/DOWN & LEFT/RIGHT
    q = deque()
    visited[0][0][0] = True
    visited[1][0][0] = True 
    q.append([0,0,-1,0]) # 좌표, 방향, 비용
    
    while q:
        cur_r, cur_c, dir, sum = q.popleft()
        
        # 도착
        if cur_r == N-1 and cur_c == N-1:
            answer.append(sum)
            continue
        
        for i in range(2):
            for dr, dc in dirs[i]:
                nr, nc = cur_r + dr, cur_c + dc
                if 0 <= nr < N and 0 <= nc < N and board[nr][nc] == 0:
                    if dir == -1 or dir == i: # 첫 이동 또는 같은 방향 이동 
                        nxt_sum = sum+100
                    elif dir != i: # 코너링
                        nxt_sum = sum+600 
                    if not visited[i][nr][nc] or visited[i][nr][nc] >= nxt_sum: # 미방문 지점이거나 방문처리된 지점의 비용보다 같거나 작은 경우 비용 갱신
                        visited[i][nr][nc] = nxt_sum
                        q.append([nr, nc, i, nxt_sum])

    return min(answer)
