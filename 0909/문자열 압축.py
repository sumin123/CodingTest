def solution(s):
    answer = 0
    
    N = len(s)
    result = []
    
    if N == 1:
        return 1
    
    # 쪼개는 길이를 늘려가기
    for i in range(1,N//2+1):
        word = s[:i]
        cnt = 0
        i_result = ''
        for idx in range(N//i):
            if word == s[idx*i:idx*i+i]:
                cnt += 1
                
            else:
                if cnt > 1:
                    i_result += (str(cnt) + word)
                    word = s[idx*i:idx*i+i]
                    cnt = 1
                else:
                    i_result += word
                    word = s[idx*i:idx*i+i]
                    cnt = 1
        
        if cnt > 1:
            i_result += (str(cnt) + word)
        else:
            i_result += word

        i_result += s[(N//i-1)*i+i:]
        result.append(i_result)
       

    result = sorted(result, key=lambda x: len(x)) 
    answer = len(result[0])
    return answer