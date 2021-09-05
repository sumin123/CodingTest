function solution(play_time, adv_time, logs) {
    var answer = '';
    play_time = time_to_sec(play_time);
    adv_time = time_to_sec(adv_time);
    let start_q = new q();
    let end_q = new q();
    let start_list = [];
    let end_list = [];
    let max_t = 0;
    logs.map(log => {
        const [start, end] = log.split('-')
        start_list.push(time_to_sec(start));
        end_list.push(time_to_sec(end));
    })
    start_list = start_list.sort(function (a, b) {
        if (a < b) return -1;
    });
    end_list = end_list.sort(function (a, b) {
        if (a < b) return -1;
    });
    for (let i = 0; i < start_list.length; i++){
        start_q.en_q(start_list[i])
        end_q.en_q(end_list[i])
    }
    let start_time = start_q.de_q();
    let end_time = end_q.de_q();
    let time_arr = Array.from({length: play_time}, (v, i) => 0)
    let coupled = 0;
    
    for(let i = 0; i < time_arr.length; i++) {
        while(i === start_time) {
            coupled += 1;
            start_time = start_q.de_q();
        }
        while(i === end_time) {
            coupled -= 1;
            end_time = end_q.de_q();
        }
        time_arr[i] = coupled;
    }
    
    let start_t = 0;
    let show = time_arr.slice(0, adv_time).reduce((acc, cur) => acc+cur);
    let max_show = show;

    for(;start_t + adv_time <= play_time; start_t++) {
        if (show > max_show){
            max_show = show;
            max_t = start_t;
        }
        
        show = show - time_arr[start_t] + time_arr[start_t+adv_time]
    }
    
    answer = sec_to_time(max_t)
    return answer;
}

function sec_to_time(num) {
    return String(Math.floor(num/3600)).padStart(2,'0')+':'+String(Math.floor((num%3600)/60)).padStart(2,'0')+':'+String((num%60)).padStart(2,'0');
}

function time_to_sec(str) {
    var split = str.split(':');
    return Number(split[0])*60*60 + Number(split[1]*60) + Number(split[2]);
}

class q {
    constructor() {
        this.in_q = [];
        this.out_q = [];
    }
    
    en_q(el) {
        this.in_q.push(el)
    }
    
    de_q(el) {
        if (this.out_q.length === 0) 
            while (this.in_q.length !== 0)
                this.out_q.push(this.in_q.pop())
        return this.out_q.pop();
    }
}