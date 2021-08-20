def solution(lines):
    answer = 0
    timestamps = []
    times = []
    
    for line in lines:
        string = line[11:]
        etime = 60*60*1000*int(string[:2]) + 60*1000*int(string[3:5]) + 1000*int(string[6:8]) + int(string[9:12])
        stime = etime - int(float(string[13:].replace("s",""))*1000 - 1)
        timestamps.append([stime, etime])
        times.append(stime)
        times.append(etime)
        
    timestamps = sorted(timestamps, key=lambda x: [x[0], x[1]])
    times.sort()
 
    
    for t1 in times:
        cnt = 0
        t2 = t1+999
        for times in timestamps:
            s, e = times
            if e < t1 or s > t2: 
                continue
            cnt += 1

        answer = max(cnt, answer)
        

    return answer