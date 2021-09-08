function solution(n, path, order) {
    var answer = true;
    let visit = 0;
    let node_arr = [];
    for (let i = 0; i < n; i++) {
        node_arr.push(new node(i));
    }
    path.map(pair => {
        const [left, right] = pair;
        node_arr[left].neighbor.push(right);
        node_arr[right].neighbor.push(left);
    });
    let key_list = new Map();
    order.map(pair => {
        const [block, blocked] = pair;
        node_arr[block].unblock = blocked;
        node_arr[blocked].blocked = true;
        key_list.set(block, 1);
    })
    let process = new Queue();
    // let process_list = new Map();
    let process_list = [];
    process.en_q(0);
    // process_list.set(0, 1);
    process_list.push(0)
    node_arr[0].visited = true;
    if (node_arr[0].blocked === true) return false;
    let block_list = new Map();
    while(process.length() !== 0) {
        const current = process.de_q();
        //process_list.remove(current)
        node_arr[current].visited = true;
        node_arr[current].neighbor.map(el => {
            const next = node_arr[el];
            if (next.visited === false){
                if (next.blocked === true) {
                    block_list.set(el, 1);
                }
                else if (key_list.has(el)){
                    key_list.delete(el);
                    node_arr[next.unblock].blocked = false;
                    // if (process_list.includes(el) === false) {
                        process.en_q(el);
                    //     process_list.push(el);
                    // }
                    if (block_list.has(next.unblock)){
                        // if (process_list.includes(next.unblock) === false) {
                        process.en_q(next.unblock);
                        // process_list.push(next.unblock);
                        // }
                        block_list.delete(next.unblock);
                    }
                }
                else {
                    // if (process_list.includes(el) === false) {
                    process.en_q(el);
                    // process_list.push(el);
                    // }
                }
            }
        });
        visit += 1;
    }
    console.log('visited: ',visit)
    answer = visit >= n ? true : false;
    return answer;
}

class node {
    constructor(idx) {
        this.idx = idx;
        this.neighbor = [];
        this.visited = false;
        this.blocked = false;
        this.unblock = -1;
    }
}

class Queue {
    constructor() {
        this.in_q = [];
        this.out_q = [];
    }
    
    length() {
        return this.in_q.length + this.out_q.length;
    }
    
    en_q(idx) {
        this.in_q.push(idx);
    }
    
    de_q() {
        if (this.out_q.length === 0) {
            if (this.in_q.length === 0) return false;
            while(this.in_q.length !== 0) {
                this.out_q.push(this.in_q.pop());
            }
        }
        return this.out_q.pop();
    }
}