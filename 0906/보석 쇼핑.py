def solution(gems):
    answer = []
    
    # 보석의 종류
    n = len(set(gems))    
    
    # 각 보석이 등장한 최근위치
    order = {}
    
    # 보석의 첫 종류
    first = []
    
    # 구매할 구간의 시작점
    start = 0
    
    # 현재까지 구매한 종류를 체크하기 위한 set
    cart = set()
    
    for idx, gem in enumerate(gems):
        
        # 등장한 위치를 기록
        order[gem] = idx
        # 구매 목록에 추가
        cart.add(gem)
        
        # 구매 목록이 종류와 같아지면 우선 기록
        # 답이 아닌 이유? 먼저 완성된다고 해도 뒤에 더 짧은 게 나오면 그게 답이기 때문
        # 우선순위가 길이 -> 등장 순인데 등장 -> 길이 순으로 풀어서 처음에 틀렸음
        if len(cart) == n:
            answer.append([start+1, idx+1])
            
        # 첫 보석을 기록
        if not first:
            first.append(gem)
        
        # 첫 보석과 같은 보석이 등장할 때
        if first:
            if first[0] == gem:
                next_gem = min(order, key=order.get)
                first = [next_gem]
                start = order[next_gem]
                
                # 카트 목록 갱신
                cart = set(gems[start:idx+1])
                if len(cart) == n:
                    answer.append([start+1, idx+1])
        
    # 짧은 것 중 가장 먼저 등장한 구간
    answer = sorted(answer, key=lambda x:[x[1]-x[0], x[0]])
    return answer[0]