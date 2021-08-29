def solution(places):
    answer = []
    
    N = len(places)
    
    def search(n, r, c):
        
        dir = [(0,-1), (0,1), (1,0), (-1,0)]
        
        for dr, dc in dir:
            nr, nc = r+dr, c+dc
            if 0 <= nr < N and 0 <= nc < N:
                if places[n][nr][nc] == 'P':
                    return False
                
        dir2 = [(0,-2, 0, -1), (0, 2, 0, 1), (2, 0, 1, 0), (-2, 0, -1, 0)]
        
        for dr, dc, dr1, dc1 in dir2:
            nr, nc = r+dr, c+dc
            cr, cc = r+dr1, c+dc1
            if 0 <= nr < N and 0 <= nc < N:
                if places[n][nr][nc] != 'P':
                    continue
                if places[n][cr][cc] == 'X':
                    continue
                    
                return False
                
        corner = [(-1,-1,-1,0,0,-1), (-1,1,-1,0,0,1), (1,-1,0,-1,1,0), (1,1,1,0,0,1)]
        
        for dr, dc, dr1, dc1, dr2, dc2 in corner:
            
            nr, nc = r+dr, c+dc
            cr1, cc1 = r+dr1, c+dc1
            cr2, cc2 = r+dr2, c+dc2
            
            if 0 <= nr < N and 0 <= nc < N:
                if places[n][nr][nc] != 'P':
                    continue
                if places[n][cr1][cc1] == 'X' and places[n][cr2][cc2] == 'X':
                    continue
                return False
        
        
        return True
    
    # P 만나면 맨해튼 거리 2를 탐색하여 만족하는지 검사하자
    
    for n, place in enumerate(places):
        mod = 0
        if mod == 1:
            break
        for i in range(N):
            
            for j in range(N):
                if place[i][j] == 'P':
                    if not search(n, i, j):
                        if mod == 0:
                            answer.append(0)
                            mod = 1
                            break
        if mod == 0:
            answer.append(1)
    return answer