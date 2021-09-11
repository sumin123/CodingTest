from collections import defaultdict
def solution(records, k, date):
    answer = []
    
    
    results = {} # item 별로 [0(재구매횟수), 구매한 사람, 구매횟수]로 입력
    
    users = {} # 유저 별 구매한 아이템 목록, 횟수 저장
     
    
    date = date_to_int(date)
    start_date = date-k+1
    
    for record in records:
        rec = record.split(" ")
        cur_date, cur_user, cur_item = rec
        cur_ndate = date_to_int(cur_date)
        if cur_ndate < start_date:
            continue
        if cur_ndate > date:
            break
            
        if results.get(cur_item) is None:
            results[cur_item] = [0,set(),0]
        
        results[cur_item][1].add(cur_user)
        results[cur_item][2] += 1
        
        if users.get(cur_user) is None:
            users[cur_user] = defaultdict(int)
            
        users[cur_user][cur_item] += 1
    
    
    if not users:
        return ["no result"]
    
    for user, u_items in users.items():
        for item_idx, cnt in u_items.items():
            if cnt > 1: # 재구매 했다면
                results[item_idx][0] += 1
    
    # 재구매율 내림차순, 구매횟수 내림차순, 상품번호 오름차순
    s_results = sorted(results.items(), key=lambda item: [-item[1][0]/len(item[1][1]), -item[1][2], int(item[0][3:])])
    
    
    for item_idx in s_results:
        answer.append(item_idx[0])
    
    
    
    return answer

# 편의를 위해 날짜를 숫자로 표시
def date_to_int(date):
    Y = int(date[:4])
    M = int(date[5:7])
    D = int(date[8:])
    
    return (Y*365 + M*30 + D)