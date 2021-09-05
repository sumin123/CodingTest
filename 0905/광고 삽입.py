from collections import defaultdict
def solution(play_time, adv_time, logs):
    answer = ''
    
    # 각 시간대별로 시청중인 시청자 수를 기록해둔다
    # 그 다음 각 시간마다 누적 시간을 저장한다
    times = defaultdict(int)
        
    adv_time = to_time(adv_time)
    play_time = to_time(play_time)
    
    # 시청을 시작하는 지점, 종료하는 지점의 사람 수를 기록
    st_times = defaultdict(int)
    ed_times = defaultdict(int)
    
    for log in logs:
        st, ed = to_time(log[:8]), to_time(log[9:])
        st_times[st] += 1
        ed_times[ed] += 1
    
    # 해당 시간에 시청중인 사람 수 기록
    people = 0
    
    # 전체 시간대를 검색하면서 누적 시청시간 기록
    for t in range(0, play_time+1):
        
        times[t] += (people + times[t-1])
        
        if st_times[t] > 0:
            people += st_times[t]
                
        if people > 0:
            if ed_times[t] > 0:
                people -= ed_times[t]
                
    # 각 시간대별로 시청시간 기록 
    result = []
    for t in range(0, play_time+1):
        cur_t = times[t+adv_time] - times[t]
        result.append([cur_t, t])
    
    result = sorted(result, key=lambda x: [-x[0], x[1]])
    
    answer = to_string(result[0][1])
    
    return answer

def to_time(string):
    h = int(string[:2])
    m = int(string[3:5])
    s = int(string[6:])    
    return h*3600 + m*60 + s

def to_string(time):
    string = ''
    h = time // 3600
    if len(str(h)) == 1:
        string += '0'
    string += (str(h) + ":")
    m = (time - h * 3600) // 60
    if len(str(m)) == 1:
        string += '0'
    string += (str(m) + ":")
    s = (time - h * 3600 - m * 60)
    if len(str(s)) == 1:
        string += '0'
    string += str(s)
    return string