def solution(n):
    
    
        
        
                
    answer = []
    
    arr = [n for n in range(1, n+1)]
    
    # 재귀 분할
    def divide(arr):
        cur_n = len(arr)
        if cur_n in prime_list:
            answer.extend(arr)
            return
        
        if cur_n == 1:
            answer.extend(arr)
            return
        
        for num in prime_list:
            if num <= cur_n and cur_n % num == 0:
                cur_size = num
                break
        
        
        
        arrs = [[] for _ in range(cur_size)]
        order = 0
        for num in arr:
            arrs[order%cur_size].append(num)
            order += 1
        
        
        for next_arr in arrs:
            # print(arrs)
            divide(next_arr)
    
    # 소수 찾기
    prime_list = find_prime_number(n)
    
    # 분할 시작
    divide(arr)
    
    
        
    
    return answer




def find_prime_number(n):
    
    prime_list = []
    
    for num in range(2, n+1):
        cnt = 0 # 약수의 개수
        for i in range(1, num+1):
            if num % i == 0:
                cnt += 1
                
        if cnt == 2:
            prime_list.append(num)
    
    return prime_list