class Node{
    constructor(idx, num) {
        this.idx = idx;
        this.adj = [];
        this.num = num;
        this.dim = -1;
    }
}

class Queue{
    constructor(head) {
        this.stack1 = [];
        this.stack2 = [];
    }
    enqueue(idx) {
        this.stack1.push(idx);
    }
    dequeue() {
        if (this.stack2.length === 0) {
            if (this.stack1.length === 0)
                return undefined;
            else {
                while (this.stack1.length !== 0) this.stack2.push(this.stack1.pop());
            }
        }
        
        return this.stack2.pop();
    }
}

function solution(a, edges) {
    var answer = 0;
    if (a.reduce((acc, cur)=> acc+cur) !== 0) return -1;
    let nodeList = [];
    a.forEach((el, idx) => {
        let newNode = new Node(idx, el);
        nodeList.push(newNode);
    });
    edges.map(edge => {
        const v1 = edge[0];
        const v2 = edge[1];
        nodeList[v1].adj.push(v2);
        nodeList[v2].adj.push(v1);
    });
    let nodeDim1 = new Queue();
    let nodeByDim = {};
    nodeList.forEach((node, idx) => {
        const numAdj = node.adj.length;
        node.dim = numAdj;
        if(numAdj === 0) return -1;
        if(numAdj === 1) nodeDim1.enqueue(idx);
        if (nodeByDim[numAdj] === undefined) nodeByDim[numAdj] = [idx];
        else nodeByDim[numAdj].push(idx);
    })
    let idx;
    while ((idx = nodeDim1.dequeue()) !== undefined) {
        let current = nodeList[idx];
        let parent;
        for (let i = 0; i < current.adj.length; i++){
            const _idx = current.adj[i];
            if (nodeList[_idx].dim !== 0) {
                parent = nodeList[_idx];
                break;
            }
        }
        if (current.dim === 0) continue;
        else if (current.dim === 1){
            answer += Math.abs(current.num);
            parent.num += current.num;
            current.dim = 0;
            parent.dim -= 1;

            if (parent.dim === 1) {
                nodeDim1.enqueue(parent.idx)
            };
        }
    }
    return answer;
}