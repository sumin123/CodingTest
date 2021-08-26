var minPrice;
var n;
const dir = {
    'U': [-1, 0],
    'R': [0, 1],
    'D': [1, 0],
    'L': [0, -1]
}

solution([[0,0,0],[0,0,0],[0,0,0]]);
function solution(board) {
    var answer = 0;
    n = board.length;
    minPrice = n * n * 500;

    let map = board;
    map[0][0] = 1;
    map[0][1] = 1;
    dfs(map, [0, 1], 100, 'R');
    
    map = board;
    map[0][0] = 1;
    map[1][0] = 1;
    dfs(map, [1, 0], 100, 'D');
    
    answer = minPrice;
    return answer;
}

function dfs(sMap, cur, price, prevDir){
    console.log(cur)
    if (cur[0] === n-1 && cur[1] === n-1){
        console.log(price)
        minPrice = Math.min(price, minPrice);
    }
    const sRow = cur[0];
    const sCol = cur[1];
    let newPrice;
    let newMap;
    sMap[sRow][sCol] = 1;
    console.log(sMap)
    //L
    if (sCol > 0 && sMap[sRow][sCol-1] === 0){
        newPrice = prevDir === 'L' ? 100 : 600;
        newMap = sMap;
        newMap[sRow][sCol-1] = 1;
        dfs(newMap, [sRow, sCol-1], price + newPrice, 'L')
    }
    //D
    if (sRow < n - 1 && sMap[sRow + 1][sCol] === 0){
        newPrice = prevDir === 'D' ? 100 : 600;
        newMap = sMap;
        newMap[sRow + 1][sCol] = 1;
        dfs(newMap, [sRow+1, sCol], price + newPrice, 'D')
    }
    //R
    if (sCol < n - 1 && sMap[sRow][sCol+1] === 0){
        newPrice = prevDir === 'R' ? 100 : 600;
        newMap = sMap;
        newMap[sRow][sCol+1] = 1;
        dfs(newMap, [sRow, sCol+1], price + newPrice, 'R')
    }
    //U
    if (sRow > 0 && sMap[sRow-1][sCol] === 0){
        newPrice = prevDir === 'U' ? 100 : 600;
        newMap = sMap;
        newMap[sRow-1][sCol] = 1;
        dfs(newMap, [sRow-1, sCol], price + newPrice, 'U')
    }
}

