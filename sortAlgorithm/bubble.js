function swap (arr, idx) {
  let temp = arr[idx];
  arr[idx] = arr[idx + 1];
  arr[idx + 1] = temp;
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for(let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j+1]) swap(arr, j);
    }
  }
  return arr;
}

console.log(bubbleSort([1,4,53,26,3,6]));