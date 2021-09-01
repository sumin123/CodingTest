from collections import deque, defaultdict
def solution(game_board, table):
    answer = 0
    
    N = len(game_board)

    blocks = defaultdict(list)

    visited = [[False for _ in range(N)] for _ in range(N)]
    # 블록 찾기
    for i in range(N):
        for j in range(N):
            if table[i][j] == 1 and not visited[i][j]:
                block = bfs(table, visited, i, j, 1)
                blocks[len(block)].append(standard(block))
                
    # 빈 공간 찾기
    for i in range(4):
        game_board = rotate(game_board)
        visited = [[False for _ in range(N)] for _ in range(N)]
        for i in range(N):
            for j in range(N):
                if game_board[i][j] == 0 and not visited[i][j]:
                    spce = bfs(game_board, visited, i, j, 0)
                    space = standard(spce)

                    len_space = len(space)
                    if blocks[len_space]:
                        for idx, block in enumerate(blocks[len_space]):
                            if space == block:
                                blocks[len_space].pop(idx)
                                answer += len_space
                                for r, c in spce:
                                    game_board[r][c] = 1
                                break

    return answer

def bfs(B, visited, r, c, target): 
    N = len(B)
    q = deque()
    # visited = [[False for _ in range(N)] for _ in range(N)]
    dir = [(0,1), (0,-1), (1,0), (-1,0)]
    visited[r][c] = True
    result = [[r,c]]
    
    q.append([r,c])
    while q:
        cr, cc = q.popleft()
        
        for dr, dc in dir:
            nr, nc = cr+dr, cc+dc
            if 0 <= nr < N and 0 <= nc < N:
                if B[nr][nc] == target and not visited[nr][nc]:
                    q.append([nr,nc])
                    visited[nr][nc] = True
                    result.append([nr,nc])
    
    return result

def standard(R): # 좌표계 변환
    R = sorted(R)
    std_x = R[0][0]
    std_y = R[0][1]
    tmp = []
    for x, y in R:
        tmp.append([x-std_x, y-std_y])
    
    return sorted(tmp)

def rotate(B): # 시계방향으로 90도 회전
    N = len(B)
    
    m = [[0 for _ in range(N)] for _ in range(N)]
    
    for r in range(N):
        for c in range(N):
            m[c][N-1-r] = B[r][c]
            
    return m