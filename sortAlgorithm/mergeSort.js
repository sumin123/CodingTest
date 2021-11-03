function mergeSort(arr) {
  if (arr.length === 1) return arr;
  const len = arr.length;
  const mid = Math.floor(len / 2);
  const arr1 = mergeSort(arr.slice(0, mid));
  const arr2 = mergeSort(arr.slice(mid, len));

  return merge(arr1, arr2);
}

function merge(arr1, arr2) {
  let idx1 = 0;
  let idx2 = 0;
  let answer = [];
  while (idx1 !== arr1.length || idx2 !== arr2.length) {
    if (idx1 === arr1.length) {
      answer.push(...arr2.slice(idx2, arr2.length))
      return answer;
    }
    else if (idx2 === arr2.length) {
      answer.push(...arr1.slice(idx1, arr1.length))
      return answer;
    }
    else if (arr1[idx1] > arr2[idx2]) {
      answer.push(arr1[idx1++]);
    }
    else if (arr1[idx1] < arr2[idx2]) {
      answer.push(arr2[idx2++]);
    }
  }
  return answer;
}

console.log(mergeSort([1,4,5,3,6,7,8]));