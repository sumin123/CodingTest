def solution(key, lock):
    answer = False
    
    N = len(lock)
    M = len(key)
    # 단순 구현 문제
    # 열쇠를 자물쇠 전체를 회전해가며 이동하면서 맞는 경우를 찾아보자
    # (0,0)에서 시작한다고 가정하고 열쇠를 Lock을 완전히 벗어나지 않는 범위 내에서 이동
    # 이동 범위 : -M+1 ~ N-1
    
    # key를 먼저 회전시킨다음 이동시키면서 lock과 일치하는 그림 찾기
    
    blanks = search(0, lock)
    len_b = len(blanks)
    
    for i in range(4):
        key = rotate(key)
        bumps = search(1, key)
        # print(bumps)
        
        for dr in range(-M+1, N):
            for dc in range(-M+1, N):
                new_bump = []
                for cr,cc in bumps:
                    
                    nr, nc = cr+dr, cc+dc
                    if 0 <= nr < N and 0 <= nc < N:
                        new_bump.append([nr,nc])
                    # print(new_bump, blanks)
                if len(new_bump) != len_b:
                    continue
                    
                if new_bump == blanks:
                    return True
                    

    return answer

def rotate(arr):
    N = len(arr)
    r_arr = [[0 for _ in range(N)] for _ in range(N)]
    
    for r in range(N):
        for c in range(N):
            r_arr[c][N-1-r] = arr[r][c]
            
    return r_arr
    
def move(arr, dr, dc):
    N = len(arr)
    m_arr = [[0 for _ in range(N)] for _ in range(N)]
    
    for r in range(N):
        for c in range(N):
            nr, nc = r+dr, c+dc
            if 0 <= nr < N and 0 <= nc < N:
                m_arr[r+dr][c+dc] = arr[r][c]
    
    return m_arr

def search(target, lock):
    N = len(lock)
    blanks = []
    for i in range(N):
        for j in range(N):
            if lock[i][j] == target:
                blanks.append([i,j])
                
    return blanks
