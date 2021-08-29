from collections import deque
def solution(board):

    answer = 0
    
    # 단순한 BFS가 아닐까? 구현하기만 귀찮은 거 같다
    # 방문처리, 각 이동 구현이 관건이다
    # board가 NxN이면 복잡하니 순서대로 번호붙여 1차원으로 구현
    # visited는 2칸의 상태를 나타내기 위해 2차원으로 구현, [i][j] == [j][i]
    
    def move(p1, p2, time):
        result = []
        
        # 평행이동 구현
        
        # Up
        if p1-N >= 0 and p2-N >=0:
            if new_board[p1-N] != 1 and new_board[p2-N] != 1 and not visited[p1-N][p2-N]:
                result.append([p1-N, p2-N, time+1])
        

        # Down
        if (p1+N) < N*N and (p2+N) < N*N:
            if new_board[p1+N] != 1 and new_board[p2+N] != 1 and not visited[p1+N][p2+N]:
                result.append([p1+N, p2+N, time+1])
            

        # Left
        if (p1-1) >= 0 and (p2-1) >= 0 and p1%N > 0 and p2%N > 0:
            if not visited[p1-1][p2-1] and new_board[p1-1] != 1 and new_board[p2-1] != 1:
                result.append([p1-1, p2-1, time+1])
            
        # Right
        if (p1+1) < N*N and (p2+1) < N*N and p1%N < N-1 and p2%N < N-1:
            if not visited[p1+1][p2+1] and new_board[p1+1] != 1 and new_board[p2+1] != 1:
                result.append([p1+1, p2+1, time+1])

        return result
        
    
    def rotate(pivot, rotate, time):
        # 회전 로직 구현하기 위해서 현재 위치에서 주변 3x3에 벽이 있는지 검사해야 한다.
        result = []
        
        if rotate == pivot - N:
            
            # 시계 방향

            if pivot % N < N-1:
                if new_board[pivot-N+1] != 1 and new_board[pivot+1] != 1 and not visited[pivot][pivot+1]:
                    result.append([pivot, pivot+1, time+1])
                
            # 반시계 방향

            if pivot % N > 0:
                if new_board[pivot-N-1] != 1 and new_board[pivot-1] != 1 and not visited[pivot][pivot-1]:
                    result.append([pivot, pivot-1, time+1])
                    
        elif rotate == pivot + 1:
            
            # 시계 방향
            if pivot // N < N-1:
                if new_board[pivot+N+1] != 1 and new_board[pivot+N] != 1 and not visited[pivot][pivot+N]:
                    result.append([pivot, pivot+N, time+1])
                    
            # 반시계 방향
            if pivot // N > 0:
                if new_board[pivot-N+1] != 1 and new_board[pivot-N] != 1 and not visited[pivot][pivot-N]:
                    result.append([pivot, pivot-N, time+1])
                    
        elif rotate == pivot + N:

            # 시계 방향
            if pivot % N > 0 and not visited[pivot][pivot-1]:
                if new_board[pivot+N-1] != 1 and new_board[pivot-1] != 1:
                    result.append([pivot, pivot-1, time+1])
                    
            # 반시계 방향
            if pivot % N < N-1 and not visited[pivot][pivot+1]:
                if new_board[pivot+N+1] != 1 and new_board[pivot+1] != 1:
                    result.append([pivot, pivot+1, time+1])
                    
        elif rotate == pivot - 1:
            
            # 시계 방향
            if pivot // N > 0 and not visited[pivot][pivot-N]:
                if new_board[pivot-N-1] != 1 and new_board[pivot-N] != 1:
                    result.append([pivot, pivot-N, time+1])
                    
            # 반시계 방향
            if pivot // N < N-1 and not visited[pivot][pivot+N]:
                if new_board[pivot+N-1] != 1 and new_board[pivot+N] != 1:
                    result.append([pivot, pivot+N, time+1])
                    
        return result
    
    
    N = len(board)
    goal = N*N-1
    visited = [[False for _ in range(N*N)] for _ in range(N*N)]

    
    new_board = [0 for _ in range(N*N)]
    # board 1차원으로 변환
    for i in range(N): 
        for j in range(N):
            if board[i][j] == 1:
                new_board[j+N*i] = 1
    
    
    q = deque()
    q.append([0, 1, 0]) # p1, p2, cur_time
    
    while q:
        p1, p2, cur_t = q.popleft()
        # 도착 시
        if p1 == goal or p2 == goal:
            return cur_t
        
        
        # 방문 처리
        if visited[p1][p2]:
            continue
            
        result = rotate(p1,p2,cur_t)
        if result:
            q.extend(result)
        result = rotate(p2,p1,cur_t)
        if result:
            q.extend(result)
        result = move(p1,p2,cur_t)
        if result:
            q.extend(result)
            
        visited[p1][p2] = True
        visited[p2][p1] = True
        

    
    return answer