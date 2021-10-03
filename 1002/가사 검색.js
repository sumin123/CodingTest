function solution(words, queries) {
  var answer = [];
  let fromStart = new Map();
  let fromEnd = new Map();
  
  words.map(word => {
      let len = word.length;
      const startCh = word[0];
      var curNode = new Node('');
      if (fromStart.has(startCh) === false) {
          curNode = new Node(startCh);
          fromStart.set(startCh, curNode);           
      }
      else {
          curNode = fromStart.get(startCh);
      }
      for(let i = 1; i < word.length; i++) {
          curNode.numChild += 1;
          addLenList(curNode, len);
          len -= 1;
          const ch = word[i];
          //console.log(ch, len, curNode.lenList.get(len+1))
          if (curNode.child.has(ch) === false) {
              const newNode = new Node(ch);
              curNode.child.set(ch, newNode);
              curNode = newNode;
          }
          else {
              curNode = curNode.child.get(ch);
          }
      }
      addLenList(curNode, len);
  })
  
  words.map(word => {
      let len = word.length;
      const endCh = word[word.length-1];
      var curNode = new Node('');
      if (fromEnd.has(endCh) === false) {
          curNode = new Node(endCh);
          fromEnd.set(endCh, curNode);           
      }
      else {
          curNode = fromEnd.get(endCh);
      }
      for(let i = word.length - 2; i >= 0; i--) {
          curNode.numChild += 1;
          addLenList(curNode, len);
          len -= 1;
          const ch = word[i];
          //console.log(ch, len, curNode.lenList.get(len+1))
          if (curNode.child.has(ch) === false) {
              const newNode = new Node(ch);
              curNode.child.set(ch, newNode);
              curNode = newNode;
          }
          else {
              curNode = curNode.child.get(ch);
          }
      }
      addLenList(curNode, len);
  })
  
  queries.map(query => {
      if (query[0] !== '?') {
          if (fromStart.has(query[0]) === false) {
              answer.push(0);
          }
          else {
              let curNode = fromStart.get(query[0]);
              let ch = query[0];
              let len = query.length;
              for(let i = 1; i < query.length; i++) {
                  ch = query[i];
                  len -= 1;
                  if (ch === '?') {
                      let tempAnswer = curNode.lenList.get(len+1);
                      if (tempAnswer === undefined) tempAnswer = 0;
                      answer.push(tempAnswer);
                      break;
                  }
                  if (curNode.child.has(query[i]) === false) {
                      answer.push(0);
                      break;
                  }
                  curNode = curNode.child.get(query[i]);
              }
          }
      }
      
      else {
          if (query[query.length-1] === '?') {
              let sum = 0;
              fromEnd.forEach((val, idx) => {
                  const num = val.lenList.get(query.length);
                  if (num !== undefined) sum += num;
              })
              answer.push(sum);
          }
          else if (fromEnd.has(query[query.length-1]) === false) {
              answer.push(0);
          }
          else {
              let curNode = fromEnd.get(query[query.length-1]);
              let len = query.length;
              let ch = '';
              // console.log(query)
              for(let i = query.length - 2; i >= 0; i--) {
                  ch = query[i];
                  // console.log('child', ...curNode.child.keys())
                  len -= 1;
                  if (ch === '?') {
                      //console.log(query, ...curNode.lenList)
                      let tempAnswer = curNode.lenList.get(len+1);
                      if (tempAnswer === undefined) tempAnswer = 0;
                      answer.push(tempAnswer);
                      break;
                  }
                  if (curNode.child.has(query[i]) === false) {
                      answer.push(0);
                      break;
                  }
                  curNode = curNode.child.get(query[i]);
              }
          }
      }
  })
  
  return answer;
}

class Node{
  constructor(char) {
      this.ch = char;
      this.child = new Map();
      this.lenList = new Map();
      this.numChild = 0;
  }
}

function addLenList(node, len) {
  if (node.lenList.has(len) === true) {
      node.lenList.set(len, node.lenList.get(len) + 1);
  }
  else {
      node.lenList.set(len, 1);
  }
}