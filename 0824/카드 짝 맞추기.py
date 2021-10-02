from itertools import permutations
from collections import deque
from copy import deepcopy
def solution(board, r, c):
    answer = 0
    N = len(board)
    # 모든 뒤집는 경우의 수를 조사하자
    # 6종류의 카드이므로 6! = 720 가지
    results = []
    
    num_card = {}
    cards = []
    for i in range(N):
        for j in range(N):
            card = board[i][j]
            num_card[card] = 1
    
    for k in num_card.keys():
        if k != 0:
            cards.append(k)
            
    orders = list(permutations(cards, len(cards)))
    
    for order in orders:
        total = 0
        new_board = deepcopy(board)
        cr, cc = r, c
        # order = (2,3,1)
        for card in order:
            # 해당 카드를 둘다 뒤집는 최단 경우의 수 찾기
            # 무조건 현재 지점에서 가까운 카드를 집으면 된다 -> 어차피 두 카드간 이동은 같으므로

            result = search(new_board, card, cr, cc, total)
            cr, cc = result[0], result[1]
            total += result[2]
            # refresh(new_board, card)
        results.append(total)
    print(results)
    answer = min(results)
    return answer

def refresh(board, target):
    N = len(board)
    for i in range(N):
        for j in range(N):
            if board[i][j] == target:
                board[i][j] = 0
    return

def search(board, target, r, c, turn, is_first=True):
    N = len(board)
    dir = [(-1,0), (1,0), (0,-1), (0,1)] # 상하좌우
    q = deque()
    visited = [[False for _ in range(N)] for _ in range(N)]
    visited[r][c] = True
    q.append([r,c,0]) # 현재 위치, 소모한 턴, 방향  
    while q:
        # print(q)
        cr, cc, turn = q.popleft()
        if board[cr][cc] == target:
            # print(cr, cc, turn)
            # 선택에 드는 turn 고려
            if is_first:
                is_first = False
                q = deque()
                q.append([cr, cc, turn+1])
                visited = [[False for _ in range(N)] for _ in range(N)]
                visited[cr][cc] = True
                board[cr][cc] = 0
                continue
                
            else:
                board[cr][cc] = 0
                return [cr, cc, turn+1]
            
        # crtl + 방향키 구현
        for i in [-1, 1]:
            nr = cr + i
            if 0 > nr or N <= nr:
                nr = cr
                
            else:
                while True:
                    
                    if nr == 0 or nr == N-1 or board[nr][cc] != 0:
                        break
                        
                    nr += i
                        
            if not visited[nr][cc]:
                q.append([nr,cc,turn+1])
                visited[nr][cc] = True
                
        # 좌우
        for i in [-1, 1]:
            nc = cc + i
            if 0 > nc or N <= nc:
                nc = cc
                
            else:
                while True:
                    
                    if nc == 0 or nc == N-1 or board[cr][nc] != 0:
                        break
                        
                    nc += i
                        
            if not visited[cr][nc]:
                q.append([cr,nc,turn+1])
                visited[cr][nc] = True
        
        # 한칸씩 이동
        for dr, dc in dir:
            nr, nc = cr+dr, cc+dc
            if 0 <= nr < N and 0 <= nc < N and not visited[nr][nc]:
                q.append([nr,nc,turn+1])
                visited[nr][nc] = True
                    
    # print(visited)
                
    

    