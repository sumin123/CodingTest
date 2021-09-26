let ticketTable = new Map();
let cand = [];
function solution(tickets) {
    var answer = [];
    tickets.forEach(([from, to], idx) => {
        if (ticketTable.has(from) === false) ticketTable.set(from, []);
        let toList = ticketTable.get(from);
        toList.push([to, idx]);
    });
    ticketTable.forEach((val, idx) =>{
        val.sort((x, y) => {
            if (x[0] > y[0]) return 1;
            else return -1;
        });
    });
    let flags = Array.from(Array(tickets.length).fill(0));
    dfs('ICN', ['ICN'], flags);
    //console.log('cand', cand)
    answer = cand[0];
    return answer;
}

function dfs(current, path, flags) {
    //console.log('==========', path)
    if (path.length === flags.length + 1) {
        cand.push(path);
        return;
    }
    const nextDstList = ticketTable.get(current);
    if (nextDstList === undefined) return;
    
    for (let i = 0; i < nextDstList.length; i++) {
        const [dst, idx] = nextDstList[i];
        if (flags[idx] === 0) {
            const newFlags = [...flags]
            newFlags[idx] = 1;
            const newPath = [...path, dst];
            dfs(dst, newPath, newFlags);
        }
    }
}