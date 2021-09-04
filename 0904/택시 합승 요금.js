function solution(n, s, a, b, fares) {
    var answer = Number.MAX_SAFE_INTEGER;
    //Floyd-Warshal
    let table = [];
    for (let i = 0; i < n; i++){
        let row = []
        for (let j = 0; j < n; j++){
            if (i === j) row.push(0);
            else row.push(Number.MAX_SAFE_INTEGER);
        }
        table.push(row);
    }
    fares.map(fare => {
        const [src, dest, price] = fare;
        table[src-1][dest-1] = price;
        table[dest-1][src-1] = price;
    })
    for (let i = 0; i < n; i++) {
        for (let src = 0; src < n; src++){
            for (let dest = 0; dest < n; dest++){
                const oldF = table[src][dest];
                const newF = table[src][i] + table[i][dest];
                if (oldF > newF) {
                    table[src][dest] = newF;
                    table[dest][src] = newF;
                }
            }
        }
    }

    for (let dest = 0; dest < n; dest++){
        const newF = table[s-1][dest] + table[dest][a-1] + table[dest][b-1];
        if (answer > newF) answer = newF;
    }
    return answer;
}