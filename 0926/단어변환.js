let target_g;
let words_g;
function solution(begin, target, words) {
    var answer = 0;
    let current = begin;
    let step = 1;
    let flags = Array.from(Array(words.length).fill(0))
    const ready = new Queue();
    words.forEach((word, idx) => {
        if (countSameChar(begin, word) === begin.length - 1) {
            ready.en_q(idx);
            flags[idx] = 1;
        }
    });
    
    while (ready.length !== 0) {
        const iter = ready.length;
        //console.log(ready)
        for (let i = 0; i < iter; i++) {
            const wordIdx = ready.de_q()
            const word = words[wordIdx];
            if (word === target) return step;
            words.forEach((word_compare, compareIdx) => {
                //console.log(`compare ${word}, ${word_compare}`)
                if (countSameChar(word_compare, word) === (word.length - 1) && flags[compareIdx] === 0) {
                    //console.log('Boom!')
                    ready.en_q(compareIdx);
                    flags[compareIdx] = 1;
                }
            });
        }        
        step += 1;
    }
    return answer;
}

function countSameChar(source, target) {
    let same_count = 0;
    for (let i = 0; i < source.length; i++) {
        if (source[i] === target[i]) same_count += 1;
    }
    return same_count
}

class Queue{
    constructor() {
        this.in_q = [];
        this.out_q = [];
    }
    
    en_q(el) {
        this.in_q.push(el);
    }
    
    de_q() {
        if (this.out_q.length === 0) {
            while (this.in_q.length !== 0) {
                this.out_q.push(this.in_q.pop());
            }
        }
        return this.out_q.pop();
    }
    
    get length() {
        return this.in_q.length + this.out_q.length
    }
}