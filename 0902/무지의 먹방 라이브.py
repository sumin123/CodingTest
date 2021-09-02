from collections import defaultdict
def solution(food_times, k):
    
    
    answer = 0
    N = len(food_times)
    s = sum(food_times)
    
    # 중단될때까지 먹을 수 없는 경우
    if s <= k:
        return -1
    
    i = 0 # 실제 시간 흐름
    j = 0 # 현재 음식의 위치
    
    # k초까지 먹방 진행
    while i < k:
        
        if food_times[j%N] > 0:
            food_times[j%N] -= 1
            
            i += 1
            j += 1
            
        else:
            j += 1
        
    # k+1 번째를 찾기 위해서 진행    
    
    while food_times[j%N] == 0:
        j += 1
        
    # 인덱스 -> 번째로 변환
    answer = (j%N)+1
    
    return answer