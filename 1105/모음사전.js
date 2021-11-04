const CHAR_TO_NUM = {
  A: 0,
  E: 1,
  I: 2,
  O: 3,
  U: 4,
};
const NUM_TO_CHAR = {
  0: "A",
  1: "E",
  2: "I",
  3: "O",
  4: "U",
  5: "X",
};

function solution(word) {
  var answer = 0;
  let myWord = [];
  while (myWord.join("") !== word) {
    answer += 1;
    if (myWord.length !== 5) {
      myWord.push("A");
      continue;
    }

    const lastNum = CHAR_TO_NUM[myWord[4]];
    myWord[4] = NUM_TO_CHAR[lastNum + 1];
    if (myWord[4] === "X") {
      for (let i = 4; i >= 0; i--) {
        if (myWord[i] === "X") {
          myWord.pop();
          const prevChar = myWord[i - 1];
          const prevNum = CHAR_TO_NUM[prevChar];
          myWord[i - 1] = NUM_TO_CHAR[prevNum + 1];
        }
      }
    }
  }
  return answer;
}
