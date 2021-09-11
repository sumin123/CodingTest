from collections import Counter, defaultdict
def solution(research, n, k):
    answer = ''
    
    # 키워드 별로 day count 정리
    day_count = defaultdict(list)
    
    # 이슈 검색어 목록
    best_issue = []
    
    
    
    # n일 동안 합계가 이 기준 이상이어야 함
    criteria = 2*n*k
    
    for day_keyword in research:
        
        cur_cnt = Counter(day_keyword)
        
        for key, cnt in cur_cnt.items():
            
            day_count[key].append(cnt)
    
        
        
    for key in day_count:
        if len(day_count[key]) < n:
            continue
        
        # 연속 k번 이상 등장한 횟수
        cont = 0
        
        for day, count in enumerate(day_count[key]):
            
            if count >= k:
                cont += 1
            else:
                cont = 0
            
            if cont == n:
                if sum(day_count[key][day-n+1:day+1]) >= criteria:
                    best_issue.append(key)
                    cont = 1

    if best_issue:
        result = Counter(best_issue).most_common()
        # 선정 횟수 -> 사전 순 정렬
        result = sorted(result, key=lambda x:[-x[1], x[0]])
        answer = result[0][0]
    else:
        return "None"
        
    return answer