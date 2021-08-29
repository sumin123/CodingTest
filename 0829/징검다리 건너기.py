import sys
def solution(stones, k):
    
    N = len(stones)
    
    result = 1
    
    # 어차피 모든 stones > 0일 때는 모두 건널 수 있다.
    # 그러므로 하방은 stones의 최솟값이고 상방은 stones의 최댓값이다.
    # 모두 최댓값이라고 하더라도 k는 stones의 길이 이하이므로 그 이상으론 못건넌다.
    # 하방과 상방이 정해져있으므로 이진 탐색이 유리하다. stones 요소가 너무커서 하나하나 검색하다가는 타임아웃
 
    
    left = min(stones)
    # left = 1 근데 이게 더 빠른듯
    right = max(stones)
    
    while left <= right:
        mid = (left+right) // 2
        new_stones = [st-mid+1 for st in stones]
        cnt = 0
        for st in new_stones: # 리스트 비교하는거보다 그냥 단순히해야 시간초과 안남
            if st > 0:
                cnt = 0
            else:
                cnt += 1
                if cnt == k:
                    right = mid-1
                    break
                
        else:
            result = max(mid, result)
            left = mid+1

    
    return result