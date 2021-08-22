var minPrice;
var n;
var horCostMap;
var verCostMap;
const dir = {
    'U': [-1, 0],
    'R': [0, 1],
    'D': [1, 0],
    'L': [0, -1]
}

function solution(board) {
    var answer = 0;
    n = board.length;
    horCostMap = Array.from(Array(n), () => new Array(n).fill(n * n * 500));
    verCostMap = Array.from(Array(n), () => new Array(n).fill(n * n * 500));
    minPrice = n * n * 500;
    board[0][0] = 1;
    let map = deepCopy(board);
    map[0][1] = 1;
    dfs(map, [0, 1], 100, 'R');
    
    map = deepCopy(board);
    map[1][0] = 1;
    dfs(map, [1, 0], 100, 'D');
    
    answer = minPrice;
    return answer;
}

function deepCopy(src){
    let dest = []
    src.map(line => dest.push([...line]))
    return dest;
}

function dfs(sMap, cur, price, prevDir){
    if (cur[0] === n-1 && cur[1] === n-1){
        minPrice = Math.min(price, minPrice);
        return 0;
    }
    if(prevDir === 'U' || prevDir === 'D')
        verCostMap[cur[0]][cur[1]] = price;
    else if(prevDir === 'L' || prevDir === 'R')
        horCostMap[cur[0]][cur[1]] = price;
    const sRow = cur[0];
    const sCol = cur[1];
    let newPrice;
    let newMap;
    //D
    if (sRow < n - 1 && sMap[sRow + 1][sCol] === 0){
        newPrice = prevDir === 'D' ? 100 : 600;
        if (verCostMap[sRow + 1][sCol] > price + newPrice) {
            newMap = deepCopy(sMap);
            newMap[sRow][sCol] = 1;
            newMap[sRow + 1][sCol] = 1;
            dfs(newMap, [sRow+1, sCol], price + newPrice, 'D')
        }
    }
    //R
    if (sCol < n - 1 && sMap[sRow][sCol+1] === 0){
        newPrice = prevDir === 'R' ? 100 : 600;
        if (horCostMap[sRow][sCol+1] > price + newPrice) {
            newMap = deepCopy(sMap);
            newMap[sRow][sCol] = 1;
            newMap[sRow][sCol+1] = 1;
            dfs(newMap, [sRow, sCol+1], price + newPrice, 'R')
        }
    }
    //L
    if (sCol > 0 && sMap[sRow][sCol-1] === 0){
        newPrice = prevDir === 'L' ? 100 : 600;
        if (horCostMap[sRow][sCol-1] > price + newPrice) {
            newMap = deepCopy(sMap);
            newMap[sRow][sCol] = 1;
            newMap[sRow][sCol-1] = 1;
            dfs(newMap, [sRow, sCol-1], price + newPrice, 'L')
        }
    }
    //U
    if (sRow > 0 && sMap[sRow-1][sCol] === 0){
        newPrice = prevDir === 'U' ? 100 : 600;
        if (verCostMap[sRow-1][sCol] > price + newPrice) {
            newMap = deepCopy(sMap);
            newMap[sRow][sCol] = 1;
            newMap[sRow-1][sCol] = 1;
            dfs(newMap, [sRow-1, sCol], price + newPrice, 'U')
        }
    }
}