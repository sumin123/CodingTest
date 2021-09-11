from collections import deque
def solution(student, k):
    answer = 0
    
    # 브루트 포스 문제
    
    # 전체 학생 수
    n_total = len(student)
    
    # 재학생의 수
    n = student.count(1)
    
    # 만들 수 없는 경우
    if n < k:
        return 0 
    
    # k값이 등장한 index를 기록하여 앞에서부터 몇개씩잘라가기
    k_idx = deque()
    for idx, st in enumerate(student):
        if st == 1:
            k_idx.append(idx)
    
    
    
    # 맨 앞에서부터 진행하면서 k명이 되는 구간까지를 계속 커버
    for idx, st in enumerate(student):
        # 현재 맨 왼쪽에 있는 재학생의 위치
        cur_first = k_idx[0]
        
        # 재학생 하나가 빠지는 순간 갱신
        if idx > k_idx[0]:
            k_idx.popleft()
            # 더 이상 그룹을 만들 수 없는 경우
            if len(k_idx) < k:
                return answer
            cur_first = k_idx[0]
            
        # 현재 맨 오른쪽에 있는 재학생 위치
        cur_last = k_idx[k-1]
        
        if len(k_idx) > k:
            cur_next = k_idx[k]
        else:
            cur_next = n_total
        
        
        
        answer += (cur_next - cur_last)
    
    
    
    return answer