let answerPre = [];
let answerPost = [];

function solution(nodeinfo) {
    var answer = [];
    const nodeList = [];
    nodeinfo.forEach((node, idx) => {
        nodeList.push([node[0], node[1], idx+1])
    });
    var sortedByY = [];
    nodeList.map(node => sortedByY.push([...node]))
    sortedByY.sort((a, b) => b[1] - a[1]);
    
    preorder(sortedByY)
    
    var sortedByY = [];
    nodeList.map(node => sortedByY.push([...node]))
    sortedByY.sort((a, b) => b[1] - a[1]);
    postorder(sortedByY)
    
    answer.push(answerPre, answerPost);
    return answer;
}

function preorder(arrY) {
    const parent = arrY.shift();
    answerPre.push(parent[2]);
    let lowers = [];
    let uppers = [];
    arrY.map(node => {
        if (node[0] < parent[0]) lowers.push([...node]);
        else uppers.push([...node]);
    });
    if (lowers.length !== 0)
        preorder(lowers);
    if (uppers.length !== 0)
        preorder(uppers);
}

function postorder(arrY) {
    const parent = arrY.shift();
    //console.log(parent)
    let lowers = [];
    let uppers = [];
    arrY.map(node => {
        if (node[0] < parent[0]) lowers.push([...node]);
        else uppers.push([...node]);
    });
    if (lowers.length !== 0)
        postorder(lowers);
    if (uppers.length !== 0)
        postorder(uppers);
    answerPost.push(parent[2]);
}