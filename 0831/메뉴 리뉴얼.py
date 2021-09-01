from itertools import combinations
from collections import defaultdict, Counter
def solution(orders, course):
    answer = []
    
    # 입력받을 때 조합을 통해서 기록 -> Counter로 개수 세기
    set_menus = defaultdict(list)
    for order in orders:
        N = len(order)
        for i in course:
            for set_menu in list(combinations(order, i)):
                st = "".join(sorted(set_menu))
                
                
                set_menus[i].append(st)
    
    for num in course:
        m = 0
        
        for k, v in Counter(set_menus[num]).most_common():
            if m == 0:
                m = v
            if m < 2 or v < m:
                break
            answer.append(k)
            
    
    answer.sort()
        
    return answer