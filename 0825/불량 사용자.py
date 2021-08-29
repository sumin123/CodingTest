

from itertools import permutations
def solution(user_id, banned_id):
    
    def check(id):
        for i in range(len(id)):
            if len(id[i]) != len(banned_id[i]):
                return False
            for j in range(len(id[i])):
                if banned_id[i][j] == '*':
                    continue
                if banned_id[i][j] != id[i][j]:
                    return False
        return True
        
    answer = []
    
    N = len(banned_id)
    user_list = list(permutations(user_id, N))
    
    for user in user_list:
        # print(check(user))
        if check(user):
            user = set(user)
            if user not in answer:
                answer.append(user)
        
    # print(user_list)
    
    return len(answer)