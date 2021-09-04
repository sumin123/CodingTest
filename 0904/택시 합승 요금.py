import heapq, sys
def solution(n, s, a, b, fares):
    answer = []
    
    # 결론적으로 두 지점 간 모든 최단거리를 조사한다.
    # 그 다음, (시작점 -> 합승 지점까지의 요금) + (합승 지점에서 A가 귀가하는 요금) + (합승 지점에서 B가 귀가하는 요금) 중 가장 최저 요금을 리턴한다.
    
    min_fares = [[sys.maxsize if i!=j else 0 for i in range(n)] for j in range(n)]
    
    for fare in fares:
        c, d, f = fare
        min_fares[c-1][d-1] = f
        min_fares[d-1][c-1] = f
        
    
    # 두 지점간 최단 거리를 업데이트
    # min_fares를 통해 알려진 거리 vs 임의의 정점 k를 지났을 때 거리 비교하여 업데이트
    for k in range(n): # 경유지(합승 지점)
        for i in range(n): # 출발지 
            for j in range(n): # 도착지
                if i == j:
                    continue
                # 여기서 min 함수로 비교하면 시간초과가 난다. 
                if min_fares[i][j] > min_fares[i][k] + min_fares[k][j]:
                    min_fares[i][j] = min_fares[i][k] + min_fares[k][j]
                    
                
                
    
    # 임의의 합승 지점을 순회
    for i in range(n):
        heapq.heappush(answer, min_fares[s-1][i] + min_fares[i][a-1] + min_fares[i][b-1])
        

    
    return heapq.heappop(answer)