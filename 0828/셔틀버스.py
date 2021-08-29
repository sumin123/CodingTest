from collections import deque, defaultdict
def solution(n, t, m, timetable):
    answer = ''
    
    timetable = sorted(timetable)
    timetable = to_number(timetable)
    time = 9*60-t
    people = defaultdict(list)
    
    for i in range(n):
        cnt = 0
        time += t
        while timetable:
            if timetable[0] > time or cnt >= m:
                break
            
            p = timetable.popleft()
            
            people[time].append(p)
            cnt += 1
    
    if people[time]:
        if len(people[time]) >= m:
            answer = to_date(people[time][-1] - 1)
        else:
            answer = to_date(time)
        
    else:
        answer = to_date(time)
    
    return answer

def to_number(timetable):
    numbers = []
    for time in timetable:
        number = int(time[:2]) * 60 + int(time[3:])
        numbers.append(number)
    
    return deque(numbers)

def to_date(number):
    result = ''
    h = str(number//60)
    m = str(number%60)
    
    if len(h) == 1:
        result += '0'
    result += (h + ":")
    if len(m) == 1:
        result += '0'
    result += m
    return result
    
    