from collections import deque
def solution(board):
    # 방문처리 전략 : Visited에 비용 저장 후 비용이 같거나 작은 경로가 찾아오면 갱신
    
    answer = []
    
    N = len(board)
    visited = [[False for _ in range(N)] for _ in range(N)]
    dirs = [[(-1,0), (1,0)], [(0,1), (0,-1)]] # UP/DOWN & LEFT/RIGHT
    q = deque()
    visited[0][0] = True # 시작점 방문처리
    q.append([0,0,-1,0]) # 행좌표, 열좌표, 방향, 비용
    
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
                    if dir == -1 or dir == i: # 첫 이동 또는 같은 방향 이동 시
                        nxt_sum = sum+100
                    elif dir != i: # 코너링 시
                        nxt_sum = sum+600 
                    if not visited[nr][nc] or visited[nr][nc] >= nxt_sum: # 미방문 지점이거나 방문처리된 지점의 비용보다 같거나 작은 경우 비용 갱신
                        visited[nr][nc] = nxt_sum
                        q.append([nr, nc, i, nxt_sum])
                    
    return min(answer)