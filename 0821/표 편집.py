def solution(n, k, cmd):
    answer = ['O']*n
    linked_list = {i: [i-1, i+1] for i in range(n)}
    stack = []
    # print(linked_list)
    
    for c in cmd:
        if c[0] == 'D':
            for i in range(int(c[2:])):
                k = linked_list[k][1]
                
        if c[0] == 'U':
            for i in range(int(c[2:])):
                k = linked_list[k][0]
                
        if c[0] == 'C':
            prev, next = linked_list[k]
            stack.append([prev, next, k])
            answer[k] = 'X'
            
            if next == n:
                k = prev
            else:
                k = next
            
            if next == n:
                linked_list[prev][1] = next
            elif prev == -1:
                linked_list[next][0] = prev
            else:
                linked_list[prev][1] = next
                linked_list[next][0] = prev
        if c[0] == 'Z':
            prev, next, now = stack.pop()
            answer[now] = 'O'
            if next == n:
                linked_list[prev][1] = now
            elif prev == -1:
                linked_list[next][0] = now
            else:
                linked_list[prev][1] = now
                linked_list[next][0] = now
        
        # print(k)
            
    
    
    return "".join(answer)