from collections import defaultdict
def solution(a, edges):
    answer = 0
    N = len(a)
    
    # 전략 : 트리이므로 밑에서부터 올라오면서 검사하면 편하다
    # 밑에서부터 어떻게 찾아야할지 몰랐음
    # 답 참고하여 DFS라는 쉬운 결론에 도달
    
    # DFS가 최적해인 이유는 인접한 노드끼리 한번만 계산하는 방향으로 진행(leaf node -> parent node)하기 때문이다. (와리가리 X)

    # 단순 DFS 시 노드를 한번씩만 방문하기 때문에 어디가 끝인지 알 수 없다.
    # 리프노드를 찾기 위해 방문 후 다시 넣어주고 재방문 시 해당 지점이 끝인 것을 파악한다.
    
    # 불가능 케이스
    if sum(a) != 0:
        return -1
    
    # 이미 0인 케이스
    for num in a:
        if num != 0:
            break
    
    else:
        return 0
    
    # 그래프 연결상태 dictionary로 나타냄
    graph = defaultdict(list)
    
    for e1, e2 in edges:
        graph[e1].append(e2)
        graph[e2].append(e1)
    
    stack = [[0, -1]]
    visited = [False for _ in range(N)]
    
    while stack:
        start, parent = stack.pop()
        
        # 리프 노드에 도달한 경우 
        if visited[start]:
            a[parent] += a[start] # 리프 노드값을 부모에 덮어씌우고
            answer += abs(a[start]) # 리프노드 값만큼 답에 더한다
            continue
            
        stack.append([start, parent])
        visited[start] = True
        for node in graph[start]:
            if not visited[node]:
                stack.append([node, start])
                
    
    return answer